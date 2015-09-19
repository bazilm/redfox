var token;
var xmlhttp;

function init(tok)
{
  token = tok;
  xmlhttp = new XMLHttpRequest();
}

function get_user_info()
{
  
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    console.log(xmlhttp.responseText);
    }
  }

  xmlhttp.open("GET","https://oauth.reddit.com/api/v1/me",true);
  xmlhttp.setRequestHeader("Authorization","bearer " + token);
  xmlhttp.send();
}

function get_subreddits()
{

  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    console.log(xmlhttp.responseText);
    }
  }

  xmlhttp.open("GET","https://oauth.reddit.com/subreddits/mine",true);
  xmlhttp.setRequestHeader("Authorization","bearer " + token);
  xmlhttp.send();

}
