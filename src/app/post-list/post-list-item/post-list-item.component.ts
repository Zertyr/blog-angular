import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() indexOfPost: number;
  @Input() postTitle: string;
  @Input() postContent: string;
  
  @Input() postLoveIts: number;
  @Input() postCreatedAt: Date;

  trash = faTrash;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getColor() {
    if(this.postLoveIts >= 1) {
      return 'green';
    } else if(this.postLoveIts <= -1) {
      return 'red';
    }
    return '';
  }

  likeIt(index: number){
    return this.postService.upLike(index);
  }

  dontLikeIt(index: number){
    return this.postService.downLike(index);
  }

  onDeletePost(index: number){
    this.postService.deletePost(index);
  }
}
