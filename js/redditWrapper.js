var token;
var xmlhttp;
var modhash;
function init(tok)
{
  token = tok;
  xmlhttp = new XMLHttpRequest();
  get_mod_hash();
}


function get_mod_hash()
{
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    console.log(xmlhttp.responseText);
    //set modhash here
    }
  }

  xmlhttp.open("GET","https://oauth.reddit.com/api/v1/me",true);
  xmlhttp.setRequestHeader("Authorization","bearer " + token);
  xmlhttp.send();



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

function vote(id,dir)
{


  xmlhttp.open("POST","https://oauth.reddit.com/api/vote",true);
  xmlhttp.setRequestHeader("dir",dir);
  xmlhttp.setRequestHeader("id",id);
  xmlhttp.setRequestHeader("X-Modhash",modhash);
  xmlhttp.send();


}
