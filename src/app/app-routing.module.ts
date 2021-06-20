import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAddItemComponent } from './post-list/post-add-item/post-add-item.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {path:'posts', component: PostListComponent},
  {path:'new-post', component: PostAddItemComponent},
  {path:'', redirectTo:'posts', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
