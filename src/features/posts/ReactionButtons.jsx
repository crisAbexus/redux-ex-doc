import React from "react";
import { useAddReactionMutation } from '../api/apiSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();
  console.log(`📯%cReactionButtons.jsx:16 - post.reactions`, 'font-weight:bold; background:#4cb300;color:#fff;'); //DELETEME
  console.log(post.reactions); // DELETEME
  const ReactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const count_reactions = post.reactions[name];
    console.log(`🍕%cReactionButtons.jsx:18 - count_reactions`, 'font-weight:bold; background:#53ac00;color:#fff;'); //DELETEME
    console.log(count_reactions); // DELETEME
    return (
      <button
        key={name}
        type="button"
        className="mutted-button reaction-button"
        onClick={() => {
          addReaction({ postId: post.id, reaction: name })
        }}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{ReactionButtons}</div>

}
