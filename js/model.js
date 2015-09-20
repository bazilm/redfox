var processing = false;
//******************************MODEL****************************
var model = {
	subReddit : "/",
	lastArticle : null,
	currentPage : ""
};
var searchModel = {
	subReddits : [
		{ value: 'Reddit', data:'/'},
		{ value: 'AskReddit', data: '/r/AskReddit' },
		{ value: 'funny', data: '/r/funny' },
		{ value: 'announcements', data: '/r/announcements' },
		{ value: 'pics', data: '/r/pics' },
		{ value	: 'todayilearned', data: '/r/todayilearned' },
		{ value: 'worldnews', data: '/r/worldnews' },
		{ value: 'science', data: '/r/science' },
		{ value: 'IAmA', data: '/r/IAmA' },
		{ value: 'blog', data: '/r/blog' },
		{ value: 'videos', data: '/r/videos' },
		{ value: 'gaming', data: '/r/gaming' },
		{ value: 'movies', data: '/r/movies' },
		{ value: 'Music', data: '/r/Music' },
		{ value: 'aww', data: '/r/aww' },
		{ value: 'news', data: '/r/news' },
		{ value: 'gifs', data: '/r/gifs' },
		{ value: 'askscience', data: '/r/askscience' },
		{ value: 'explainlikeimfive', data: '/r/explainlikeimfive' },
		{ value: 'EarthPorn', data: '/r/EarthPorn' },
		{ value: 'technology', data: '/r/technology' },
		{ value: 'books', data: '/r/books' },
		{ value: 'bestof', data: '/r/bestof' },
		{ value: 'television', data: '/r/television' },
		{ value: 'WTF', data: '/r/WTF' },
		{ value: 'AdviceAnimals', data: '/r/AdviceAnimals' },
		{ value: 'LifeProTips', data: '/r/LifeProTips' },
		{ value: 'sports', data: '/r/sports' },
		{ value: 'mildlyinteresting', data: '/r/mildlyinteresting' },
		{ value: 'DIY', data: '/r/DIY' },
		{ value: 'Fitness', data: '/r/Fitness' },
		{ value: 'Showerthoughts', data: '/r/Showerthoughts' },
		{ value: 'space', data: '/r/space' },
		{ value: 'tifu', data: '/r/tifu' },
		{ value: 'Jokes', data: '/r/Jokes' },
		{ value: 'food', data: '/r/photoshopbattles' },
		{ value: 'InternetIsBeautiful', data: '/r/InternetIsBeautiful' },
		{ value: 'GetMotivated', data: '/r/GetMotivated' },
		{ value: 'history', data: '/r/history' },
		{ value: 'gadgets', data: '/r/gadgets' },
		{ value: 'nottheonion', data: '/r/nottheonion' },
		{ value: 'dataisbeautiful', data: '/r/dataisbeautiful' },
		{ value: 'Futurology', data: '/r/Futurology' },
		{ value: 'Documentaries', data: '/r/Documentaries' },
		{ value: 'listentothis', data: '/r/listentothis' },
		{ value: 'personalfinance', data: '/r/personalfinance' },
		{ value: 'philosophy', data: '/r/philosophy' },
		{ value: 'nosleep', data: '/r/nosleep' },
		{ value: 'Art', data: '/r/Art' },
		{ value: 'OldSchoolCool', data: '/r/OldSchoolCool' },
  ],
  currentList : []
}
//****************************VIEW*******************************
var articleView = {
	init : function(){
		this.render();
	},
	renderTopBar : function(){
		var currentPage = octopus.getCurrentPage();
		document.getElementById("current-page").innerHTML=currentPage;
		document.getElementsByTagName("title")[0].text=currentPage;
	},
	renderArticle : function(data){
		//console.log(data);
		var article = data.data;
		var articleDiv = $("<div>", {id: "article"});
		
		//Heading
		var article_link = $("<a>",{ id:"article_link", href:article.url, target:"new"});
		var article_heading = $("<h2>", {id: "article_heading"});
		article_heading.html(article.title);
		article_link.append(article_heading);
		articleDiv.append(article_link);
		
		//Image
		if(article.thumbnail){
		if(article.thumbnail.substring(0, 4) == "http"){
				var article_image = $("<img>", {id: "article_image", src:article.thumbnail});
				articleDiv.append(article_image);
			}
		}

		//Snippet
		var article_snippet = $("<p>", {id: "article_snippet"});
		//Snippet Score
		var article_score = $("<span>", {id:"score"});
		article_score.html(article.score);
		article_snippet.append(article_score);
		article_snippet.append("</br>");
		//Snippet Description
		var article_description = $("<p>", {class:"label"});
		var article_author = $("<a>", {id:"author",href:"http://reddit.com/users/"+article.author, target:"new"});
		var created_utc = article.created_utc;
		var current_utc =  Math.floor(new Date().getTime()/1000);
		var description = "Submitted "+this.getTimePassed(current_utc-created_utc)+" ago By ";
		article_author.html(article.author);
		article_description.html(description);
		article_description.append(article_author);
		article_snippet.append(article_description);
		article_snippet.append("</br>");
		//More Info
		//Domain
		var article_domain = $("<button>", {id:"site", class:"btn btn-success", type:"button"});
		article_domain.html(article.domain);
		article_snippet.append(article_domain);
		//Subreddit
		var article_subreddit = $("<button>", {id:"sub_reddit", class:"btn btn-danger", type:"button"});
		article_subreddit.html(article.subreddit);
		article_snippet.append(article_subreddit);
		var item = { value:article.subreddit, data:"/r/"+article.subreddit};
		article_subreddit.click(function(){
					console.log(item);
					octopus.setCurrentPage(item.value);
					articleView.renderNewSubReddit(item.data);
			});
		//Comments
		var article_comments = $("<button>", {id:"comments", class:"btn btn-primary", type:"button"});
		var article_comments_link = $("<a>", {href:"http://reddit.com"+article.permalink, target:"new"});
		article_comments_link.html("Comments ");
		article_comments.append(article_comments_link);
		var article_comments_label = $("<span>", {class:"badge"})
		article_comments_label.html(article.num_comments);
		article_comments.append(article_comments_label);
		article_snippet.append(article_comments);
		article_snippet.append("</br>");
		
		articleDiv.append(article_snippet);
		
		$("#articles").append(articleDiv);
	},
	renderNewSubReddit : function(data){
		octopus.setSubReddit(data);
		octopus.setLastArticle(null);
		$("#articles").html("");
		this.renderTopBar();
		octopus.getArticles();
	},
	getTimePassed : function(time){
		var day = time/(3600*24);
		if(time/60 < 1){
			return time+" Seconds";
		}
		time = Math.floor(time/60);
		if(time == 1){
			return "1 Minute"
		}
		if(time/60 < 1){
			return time+" Minutes";
		}
		time = Math.floor(time/60);
		if(time == 1){
			return "1 Hour";
		}
		if(time/24 < 1){
			return time+" Hours";
		}
		time = Math.floor(time/24);
		if(time == 1){
			return "1 Day";
		}
		else{
			return time+" Days";
		}
	},
	renderSubReddits : function(){
		var home = document.getElementById("home");
		home.addEventListener("click",function(){
					octopus.setCurrentPage("Reddit");
					articleView.renderNewSubReddit("/");
		});
		var items = octopus.getSubReddits();
		for(var i=0;i<items.length;i++){
			//console.log(items[i].value);
			var searchItem = document.createElement("li");
			var searchLink = document.createElement("a");
			searchLink.innerHTML=items[i].value;
			var item = items[i];
			searchLink.href = "#";
			searchItem.appendChild(searchLink);
			//console.log(item);
			if((item.value[0] >= 'a' && item.value[0] <= 'c')||(item.value[0] >= 'A' && item.value[0] <= 'C'))
				document.getElementById("a-c").appendChild(searchItem);
			else if((item.value[0] >= 'd' && item.value[0] <= 'h')||(item.value[0] >= 'D' && item.value[0] <= 'H'))
				document.getElementById("d-h").appendChild(searchItem);
			else if((item.value[0] >= 'i' && item.value[0] <= 'p')||(item.value[0] >= 'I' && item.value[0] <= 'P'))
				document.getElementById("i-p").appendChild(searchItem);
			else
				document.getElementById("q-z").appendChild(searchItem);
			searchItem.addEventListener("click",(function(item){
				return function(){
					//console.log(item);
					octopus.setCurrentPage(item.value);
					articleView.renderNewSubReddit(item.data);
				}
			})(item));
		}
	}
}
//****************************OCTOPUS****************************
var octopus ={
	init : function(){
		model.currentPage = "Reddit";
		articleView.renderSubReddits();
		articleView.renderTopBar();
		this.getArticles();
	},
	getArticles : function(){
		var JsonURL = "http://www.reddit.com"+model.subReddit+".json?after="+model.lastArticle;
		//console.log(JsonURL);
		$("#loading").css("display","block");
		$.getJSON(JsonURL, function(result){
			processing = false;
			console.log(result);
			octopus.setLastArticle(result.data.children[result.data.children.length-1].data.name);
			for(var i=0;i<result.data.children.length;i++){
				articleView.renderArticle(result.data.children[i]);
			}
			$("#loading").css("display","none");
			$("#loading_error").html("");
		}).error(function(e){
			$("#loading_error").html("Failed To Load News Feeds");
	});
	},
	setLastArticle : function(article){
		model.lastArticle = article;
	},
	setSubReddit : function(page){
		model.subReddit = page;
	},
	setCurrentPage : function(page){
		model.currentPage = page;
	},
	getCurrentPage : function(){
		return model.currentPage;
	},
	getSubReddits : function(){
		return searchModel.subReddits;
	}
}

octopus.init();