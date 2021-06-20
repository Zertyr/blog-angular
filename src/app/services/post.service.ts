import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postSubscribe = new Subject<any[]>();

  posts: Post[] = [
    {
    title: "Mon premier post",
    content: "Commodo labore aliqua in consectetur proident veniam duis quis proident voluptate. Proident ea culpa do nisi laborum pariatur aliquip velit non mollit ipsum fugiat nostrud reprehenderit. Ut aliqua quis non pariatur esse elit anim enim occaecat non dolor fugiat esse enim.",
    loveIts: 2,
    created_at: new Date()
    },
    {
      title: "Mon deuxième post",
      content: "Commodo labore aliqua in consectetur proident veniam duis quis proident voluptate. Proident ea culpa do nisi laborum pariatur aliquip velit non mollit ipsum fugiat nostrud reprehenderit. Ut aliqua quis non pariatur esse elit anim enim occaecat non dolor fugiat esse enim.",
      loveIts: 0,
      created_at: new Date()
    },
    {
      title: "Mon dernier post",
      content: "Commodo labore aliqua in consectetur proident veniam duis quis proident voluptate. Proident ea culpa do nisi laborum pariatur aliquip velit non mollit ipsum fugiat nostrud reprehenderit. Ut aliqua quis non pariatur esse elit anim enim occaecat non dolor fugiat esse enim.",
      loveIts: -1,
      created_at: new Date()
    }
  ];
  constructor() { }
  
  emitPost(){
    // on extrait tout les posts pour les passer dans le tableau subject
    this.postSubscribe.next(this.posts.slice());
  }

  newPost(post: Post){
    this.posts.push(post);
    this.emitPost();
  }

  upLike(i: number) {
    this.posts[i].loveIts += 1
  }

  downLike(i: number) {
    this.posts[i].loveIts -= 1
  }

  deletePost(index: number){
    this.posts.splice(index, 1);
  }
}
