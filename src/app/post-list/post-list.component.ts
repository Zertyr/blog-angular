import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  lastUpdate = new Promise<Date>((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });
  posts: Post[];
  postSubscription: Subscription;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    // NEED THIS TO GET POSTS
    this.initGet();
    /////////////////////////
  }

  initGet() {
    this.postSubscription = this.postService.postSubscribe.subscribe(
      (posts: any[])=> {
        this.posts = posts;
      }
    );
    this.postService.getPostFromServer();
    this.posts = this.postService.posts;
    this.postService.emitPost();
  }

  onAddPost(){
    this.router.navigate(['/new-post']);
  }

  saveServer(){
    this.postService.savePostToServer();
  }
  getServer(){
    this.postService.getPostFromServer();
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }
}
