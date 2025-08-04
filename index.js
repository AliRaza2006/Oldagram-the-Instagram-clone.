
const posts =JSON.parse(localStorage.getItem("posts"))  ||[
    {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    liked: false,
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    commentbox: [
        { username: "Franz", comment: "A most exquisite brush of colors, monsieur!", image:"https://upload.wikimedia.org/wikipedia/commons/3/3d/Franz_Joseph_I_of_Austria.1910_%28cropped%29.jpg"},
        { username: "Moire", comment: "I daresay, this evokes such sentiment I nearly wept.", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Charles_Andr%C3%A9_Van_Loo_-_Madame_de_Pompadour_en_belle_jardini%C3%A8re_-_v.1754-1755FXD.jpg/250px-Charles_Andr%C3%A9_Van_Loo_-_Madame_de_Pompadour_en_belle_jardini%C3%A8re_-_v.1754-1755FXD.jpg"},
        { username: "Lumiere", comment: "A stroke of genius, truly befitting the salons of Paris!", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Lumi%C3%A8re_brothers.jpg/250px-Lumi%C3%A8re_brothers.jpg"}
    ],
    commentFlag:false,
    likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        liked: false,
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        commentFlag:false,
        commentbox: [
            { username: "Thomas", comment: "Zounds! The light in thine work doth gleam like heaven!", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/800px-Thomas_Edison2.jpg" },
            { username: "Eliza", comment: "Your art doth speak louder than a thousand poems.", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Darnley_stage_3.jpg/250px-Darnley_stage_3.jpg' },
            { username: "Baron", comment: "Splendid! Even King Louis would applaud such form!", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Simon_Leicester.jpg/800px-Simon_Leicester.jpg' }
        ],
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        commentFlag:false,
        liked: false,
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        commentbox: [
            { username: "Wisteria", comment: "This piece whispers tales of longing and light.", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Retrato_femenino_%2826771127162%29.jpg/800px-Retrato_femenino_%2826771127162%29.jpg' },
            { username: "Remy", comment: "You, sir, wield your palette as a knight doth his blade.", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Simpelveld-Kerk-beeld_Remigius.JPG/800px-Simpelveld-Kerk-beeld_Remigius.JPG' },
            { username: "Charlotte", comment: "Verily, this canvas sings a sonnet unto mine eyes.", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Charlotte_gainsborough.jpg/800px-Charlotte_gainsborough.jpg' }
        ],
        likes: 152
    }
]
const Body=document.getElementById("body")
function renderPosts(posts)
{
    let list=""
    for(let i=0;i<posts.length;i++)
    {
        let commentlist="";
        for(let j=0;j<posts[i].commentbox.length;j++)
        {
            commentlist+=`
            <div class='comment'>
            <div>
            <div class='del-com'>
            <div class='comment-head'>
                <img class='cpfp' src='${posts[i].commentbox[j].image}'>
                <h3>${posts[i].commentbox[j].username}</h3>
            </div>
            <span class="material-symbols-outlined deletebutton" data-post="${i}" data-comment="${j}">delete</span>
            </div>
                <p>${posts[i].commentbox[j].comment}</p>
            </div>
            </div>`
        }
        list+=`
        <article>
        <div>
        <div class='post-head' style='margin-bottom:5px; margin-left:5px;'>
        <img src='${posts[i].avatar}' class='profile-avatar'>
        <div class='name-location'>
        <p style='font-weight:bold; margin-bottom:0px;'>${posts[i].name}</p>
        <p style='margin-top:0px;'>${posts[i].location}</p>
        </div>
        </div>
        <div class='postfull'>
        <img src='${posts[i].post}' width='500px' style='margin-top:0px; border-radius:5px;' class='post'>
        <img src='images/heart.png' class='hrtpng'>
        </div>
        <div class='post-foot'>
        <div style='margin-top:5px;'>
        <span class='material-symbols-outlined like' style="color:${posts[i].liked?'red':'white'}; font-variation-settings:'FILL' ${posts[i].liked?1:0};" '>favorite</span>
        <span class="material-symbols-rounded cmntbtn">comment</span>
        <span class="material-symbols-rounded">send</span>
        </div>
        <div class='likes-caption'>
        <p class='likes'>${posts[i].likes} likes</p>
        </div>
        <p style='margin:2px; margin-bottom:0'><span style='font-weight:bold;'>${posts[i].username}</span> ${posts[i].comment}</p>
        </div>
        </div>
        <div class='comment-box' style='display:${posts[i].commentFlag?"block":"none"};'>
        ${commentlist}
        <div class='newcomm'>
        <textarea placeholder='Write a comment' class='scroll'></textarea>
        <button class='sub-btn'>Submit</button>
        <div>
        </div>
        </article>`
    }
    Body.innerHTML=list
}
function attachListeners() {
    const buttons = document.querySelectorAll(".like");
    const p = document.querySelectorAll(".post");
    const subBtn = document.querySelectorAll(".sub-btn");
    const deletebuttons=document.querySelectorAll(".deletebutton")
    const cmntBtn=document.querySelectorAll('.cmntbtn')
    buttons.forEach((button, index) => {
        button.addEventListener("click", function () {
            const post_foot = button.closest(".post-foot");
            const like_count = post_foot.querySelector(".likes");
            if (!posts[index].liked) {
                button.style.color = "red";
                button.style.fontVariationSettings = "'FILL' 1";
                posts[index].liked = true;
                posts[index].likes += 1;
            } else {
                button.style.color = "white";
                button.style.fontVariationSettings = "'FILL' 0";
                posts[index].liked = false;
                posts[index].likes -= 1;
            }
            like_count.textContent = posts[index].likes + " likes";
            localStorage.setItem("posts", JSON.stringify(posts));
        });
    });

    p.forEach((pel, index) => {
        pel.addEventListener("dblclick", function () {
            const post_foot = pel.closest("article").querySelector('.post-foot')
            const like_color = post_foot.querySelector(".like");
            const like_count = post_foot.querySelector(".likes");
            const heart = pel.parentElement.querySelector(".hrtpng");
            heart.style.opacity = "1";
            heart.style.transform = "translate(-50%, -50%) scale(1.2)";
            setTimeout(() => {
            heart.style.opacity = "0";
            heart.style.transform = "translate(-50%, -50%) scale(1)";
            }, 500);

            if (posts[index].liked) {
                posts[index].likes -= 1;
                like_color.style.color = "white";
                like_color.style.fontVariationSettings = "'FILL' 0";
                posts[index].liked = false;
            } else {
                posts[index].likes += 1;
                like_color.style.color = "red";
                like_color.style.fontVariationSettings = "'FILL' 1";
                posts[index].liked = true;
            }
            like_count.textContent = posts[index].likes + " likes";
            localStorage.setItem("posts", JSON.stringify(posts));
        });
    });

    subBtn.forEach((button, index) => {
        button.addEventListener("click", function () {
            const inputs = button.previousElementSibling;
            if (inputs.value) {
                const newcomment = {
                    username: "Ali Raza",
                    comment: inputs.value,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8K9TdeuJNHtTMH-JaUph5CgQ7P1nYgx8z9w&s"
                };
                posts[index].commentbox.push(newcomment);
                localStorage.setItem("posts", JSON.stringify(posts));
                renderPosts(posts);
                setTimeout(attachListeners, 0);
            }
        });
    });

    deletebuttons.forEach((button,index) => {
        button.addEventListener("dblclick",function(){
            posts[button.dataset.post].commentbox.splice(button.dataset.comment,1)
            button.style.color = "red";
            button.style.fontVariationSettings = "'FILL' 1";
            localStorage.setItem("posts",JSON.stringify(posts))
            renderPosts(posts)
            setTimeout(attachListeners,0)
        })
    });
    cmntBtn.forEach((cmntBtn,index) => {
        cmntBtn.addEventListener("click",function(){
            const cmntbx=cmntBtn.closest("article").querySelector('.comment-box')
            if(posts[index].commentFlag)
            {
                cmntbx.style.display="none";
                posts[index].commentFlag = false;
            }
            else
            {
                cmntbx.style.display="block";
                posts[index].commentFlag = true;
            }
            localStorage.setItem("posts",JSON.stringify(posts))
        })
    });
}
renderPosts(posts);
attachListeners(); 