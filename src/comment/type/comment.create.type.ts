import { Comment } from '../interface/comment.interface';

export type CommentCreate = Omit<Comment, 'id'>;
