import $ from 'jquery';
import Rx from 'rxjs/Rx';
import {getSubscriber} from './utils/getSubscriber';

let input = $('#input');
let profile = $('#profile');
profile.hide();

/*
Rx.Observable.fromEvent(input, 'keyup')
	.subscribe(e => {
		profile.show();
		Rx.Observable.fromPromise(getGithubUser(e.target.value))
			.subscribe(user => {
				$('#name').text(user.data.name);
				$('#login').text(user.data.login);
				$('#blog').text(user.data.blog);
				$('#avatar').attr('src',user.data.avatar_url);
				$('#repos').text(user.data.public_repos);
				$('#followers').text(user.data.followers);
				$('#following').text(user.data.following);
				$('#link').attr('href', user.data.html_url);
			});
	});
*/

Rx.Observable.fromEvent(input, 'keyup')
	.map(e => e.target.value)
	.debounceTime(2000)
	.switchMap((v) => {
		profile.show();
		return Rx.Observable.fromPromise(getGithubUser(v))
	})
	.subscribe(user => {
		$('#name').text(user.data.name);
		$('#login').text(user.data.login);
		$('#blog').text(user.data.blog);
		$('#avatar').attr('src',user.data.avatar_url);
		$('#repos').text(user.data.public_repos);
		$('#followers').text(user.data.followers);
		$('#following').text(user.data.following);
		$('#link').attr('href', user.data.html_url);
	});

function getGithubUser(username){
	return $.ajax({
		url: 'https://api.github.com/users/'+username+'?client_id=d9308aacf8b204d361fd&client_secret=62551cc02cee983fff0bac41baf170eb5a312c1c',
		dataType: 'jsonp'
	}).promise();
}