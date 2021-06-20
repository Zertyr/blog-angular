import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-add-item',
  templateUrl: './post-add-item.component.html',
  styleUrls: ['./post-add-item.component.scss']
})
export class PostAddItemComponent implements OnInit {

  postForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formBuilder.group({
      namePost: ['',Validators.required],
      contentPost: ['',Validators.required],
      loveIts: 0,
      created_at: Date()
    })
  }

  onSavePost() {
    const formValue = this.postForm.value;
    const newPost = new Post(
      formValue['namePost'],
      formValue['contentPost'],
      formValue['loveIts'],
      formValue['created_at']
    );

    this.postService.newPost(newPost);
    this.router.navigate(['/posts']);
  }
}
