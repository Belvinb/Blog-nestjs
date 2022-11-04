import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    Put,
    Query,
    Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    //submit a post
    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Your post has been submitted',
            post: newPost,
        });
    }

    //Fetch a post with ID
    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);
        if (!post) {
            throw new NotFoundException('Post does not exist');
        }
        return res.status(HttpStatus.OK).json(post);
    }

    //Fetch all posts

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    //Edit a post
    @Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO,
    ) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if (!editedPost) {
            throw new NotFoundException('post does not exist');

        }
        return res.status(HttpStatus.OK).json({
            message: 'The post is updated successfully',
            post: editedPost,
        });
    }

    //Delete a post

    @Delete('/delete')
    async deletePost(@Res() res,
        @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) {
            throw new NotFoundException('post does not exist');

        }
        return res.status(HttpStatus.OK).json({
            message: 'post is deleted',
            post: deletedPost,
        });
    }
    
}
