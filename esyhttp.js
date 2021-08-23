// import axios from "axios";

var fullname = document.getElementById('fullname');
var avatar = document.getElementById('avatar');
var bio = document.getElementById('bio');
var user_name = document.getElementById('username');
var followers = document.getElementById('followers');
var following = document.getElementById('following');
var NB_repos = document.getElementById('NB_repos');
var recherch = document.getElementById('recherch')
var btn_rech = document.getElementById('btn_rech')
var place = document.getElementById('place')
var twitter = document.getElementById('twitter')
var blog = document.getElementById('blog')

var data_repo
var data_repo_one;
var nb;

var username = "hamzajb"
get_info_user(username)
get_info_repos(username)

var data;

btn_rech.addEventListener('click', function () {
    username = recherch.value
    get_info_user(username)
    get_info_repos(username)
    console.log(data)

})


function print_data(data) {

    user_name.innerText = data.login
    following.innerText = data.following
    followers.innerText = data.followers
    NB_repos.innerText = data.public_repos
    avatar.src = data.avatar_url
    fullname.innerText = data.name;
    bio.innerText = data.bio
    if (data.location) {
        place.innerHTML = ` <i class="fas fa-map-marker-alt"></i>  ` + ' ' + data.location
    } else
        place.innerHTML = ""
    if (data.twitter_username) {
        twitter.innerHTML = ` <i class="fab fa-twitter"></i> <a href="https://twitter.com/${data.twitter_username}" style="text-decoration:none ; color : black" target='_blank' > ` + '@ ' + data.twitter_username + `</a>`
    } else
        twitter.innerHTML = ""

    if (data.blog) {
        blog.innerHTML = `<i class="fab fa-linkedin"></i> <a href="${data.blog}" style="text-decoration:none ; color : black" target='_blank' >  ` + " " + data.blog + `</a>`;
    }
    else
        blog.innerHTML = ""

}

function print_repos(data_inf, username) {
    var crd = "";
    var src_img = data.avatar_url
    data_inf = data_inf.sort((a, b) => b.created_at > a.created_at ? 1 : -1);
    data_inf.forEach(row => {
        // console.log(row.fork)
        if (!row.fork) {
            name_repo.push({ "repo_name": row.name, "repo_url": row.html_url })


            crd += `
                    
                    <div class="item_card">
                        <h5 class="item_title"><img class="avatar_smal" src="${src_img}" alt="" width="200px" height="200px"><i class="fas fa-project-diagram" width='5px' height='5px'> </i>. . ${row.name}</h5>
                        <h6 class="cmt_nb">Number of commites : </h6>
                        <h6 class="item_date">Created at : ${row.created_at}</h6>
                        <h6 class="item_date">Last Update in : ${row.updated_at}</h6> 
                        <a href="${row.html_url}" target='_blank'><input type="button" id="btn_rech" value="Vue Repository"> </a>


                    </div>
                `
            // get_info_repo(username, row.name)
        }
    })
    card_repo.innerHTML = crd;
}


// Make in GET Http request
function get_info_user(username) {
    // var http = new XMLHttpRequest();
    // http.open('GET', "https://api.github.com/users/" + username, true);

    // http.onload = function () {
    //     if (http.status === 200) {
    //         console.log(http.responseText);
    // data = JSON.parse(http.responseText)
    //     }
    // }
    // http.send();

    fetch("https://api.github.com/users/" + username)
        .then(response => response.json())
        .then(function (json) {
            data = json
            print_data(json)
        }
        )
}

function get_info_repo(username, repo) {
    // var http_comit = new XMLHttpRequest();

    // http_comit.open('GET', "https://api.github.com/repos/" + username + "/" + repo + "/commits", true);

    // http_comit.onload = function () {
    //     if (http_comit.status === 200) {
    //         // console.log(http.responseText);
    //         data_repo_one = JSON.parse(http_comit.responseText)
    //         console.log(data_repo_one.length)
    //         // document.getElementById('cmt_nb').innerText = nb;
    //         console.log(data_repo)

    //     }
    // }
    // http_comit.send();

    // fetch("https://api.github.com/repos/" + username + "/" + repo + "/commits")
    //     .then(response => response.json())
    //     .then((json) => print_data(json)
    //     )
}
// https://api.github.com/users/hamzajb/repos
var name_repo = []
var card_repo = document.querySelector(".card_repo");


function get_info_repos(username) {
    // var http = new XMLHttpRequest();
    // http.open('GET', "https://api.github.com/users/" + username + "/repos", true);

    // http.onload = function () {
    //     if (http.status === 200) {
    //         // console.log(http.responseText);
    //         data_repo = JSON.parse(http.responseText)
    //         print_repos(data_repo, username)
    //     }

    // }
    // http.send();

    fetch("https://api.github.com/users/" + username + "/repos")
        .then(response => response.json())
        .then((data_repo) => print_repos(data_repo, username)

        )
}

// https://api.github.com/repos/hamzajb/Pig-game






// https://api.github.com/repos/hamzajb/Pig-game/commits