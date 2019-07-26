import { Component, OnInit } from '@angular/core';
import { JsonPlaceholderService }  from '../../service/json-placeholder.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Feed {
	author: any = ''
	message: any = ''
	liked: number = 0
	disliked: number = 0

	constructor(author = 'anon', message = '') {
		this.author = author
		this.message = message
	}
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	posts: Feed[] = []
	feed = new Feed();
	postForm;
	
	constructor(private jsonService: JsonPlaceholderService) {

	}

	ngOnInit() {
		this.getPost();

		this.postForm = new FormGroup({
			authorName: new FormControl(this.feed.author, [
				Validators.required,
			  ]),
			message: new FormControl(this.feed.message, [
				Validators.required,
			  ]),
		});
	}

	post() {
		this.posts.push(this.feed)
		this.posts.reverse()
		this.feed = new Feed()
	}

	getPost() {
		this.jsonService.getPosts().subscribe(data => {
			data.forEach(d => {
				this.feed.author = d.userid;
				this.feed.message = d.body;

				this.post();
			});
		});
	}
}
