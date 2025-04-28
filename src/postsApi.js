import supabase from './supabaseClient';

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  // Fetch comments for all posts and attach comment count
  const postIds = data.map(post => post.id);
  const { data: commentsData, error: commentsError } = await supabase
    .from('comments')
    .select('post_id');
  if (commentsError) throw commentsError;
  const commentCountMap = {};
  commentsData.forEach(comment => {
    commentCountMap[comment.post_id] = (commentCountMap[comment.post_id] || 0) + 1;
  });
  const postsWithCommentCount = data.map(post => ({
    ...post,
    comments: Array(commentCountMap[post.id] || 0).fill("") // placeholder array for compatibility
  }));
  return postsWithCommentCount;
}

export async function createPost(post) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updatePost(post) {
  const { data, error } = await supabase
    .from('posts')
    .update({ title: post.title, content: post.content })
    .eq('id', post.id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deletePost(postId) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);
  if (error) throw error;
}

export async function upvotePost(postId) {
  // Fetch current upvotes
  const { data: postData, error: fetchError } = await supabase
    .from('posts')
    .select('upvotes')
    .eq('id', postId)
    .single();
  if (fetchError) throw fetchError;
  const currentUpvotes = postData.upvotes || 0;
  // Update upvotes by incrementing
  const { data, error } = await supabase
    .from('posts')
    .update({ upvotes: currentUpvotes + 1 })
    .eq('id', postId)
    .select();
  if (error) throw error;
  return data[0];
}

export async function addComment(postId, comment) {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ post_id: postId, content: comment }])
    .select();
  if (error) throw error;
  return data[0];
}

export async function fetchComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}