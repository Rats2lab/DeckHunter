import { Comment } from '../interface/comment.interface';
import { CommentCreate } from '../type/comment.create.type';

export abstract class CommentRepository {
  abstract insertOne(commentCreate: CommentCreate): Promise<Comment>;
}
