import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postSubscribe = new Subject<any[]>();

  posts: Post[] = [
    
  ];
  constructor(private httpClient: HttpClient) { }
  
  emitPost(){
    // on extrait tout les posts pour les passer dans le tableau subject
    this.postSubscribe.next(this.posts.slice());
  }

  newPost(post: Post){
    const postObject = {
      title: '',
      content: '',
      loveIts: 0,
      created_at: new Date
    };

    postObject.title = post.title;
    postObject.content = post.content;
    this.posts.push(postObject);
    this.savePostToServer();
    this.emitPost();
    console.log('posts : ' + JSON.stringify(this.posts));
    
  }

  savePostToServer(){
    this.httpClient
      .put('https://blog-angular-4629d-default-rtdb.europe-west1.firebasedatabase.app/posts.json', this.posts)
      .subscribe(
        () => {
          this.getPostFromServer();
          console.log('Terminé !');
        },
        (error) => {
          console.log('erreur : ' + error);
        }
      )
  }

  getPostFromServer(){
    this.httpClient
      .get<any>('https://blog-angular-4629d-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPost();
          console.log('Terminé !');
        },
        (error) => {
          console.log('erreur : ' + error);
        }
      );
  }


  DeletePostFromServer(i: number){

  }

  upLike(i: number) {
    this.posts[i].loveIts += 1
    this.savePostToServer();

  }

  downLike(i: number) {
    this.posts[i].loveIts -= 1
    this.savePostToServer();

  }

  deletePost(index: number){
    this.posts.splice(index, 1);
    this.savePostToServer();
  }
}
