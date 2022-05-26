// XMLHttpRequest
    let currentPage = 1;
    let totalPages;

function getUsers(page){  
        let requist = new XMLHttpRequest();
        requist.addEventListener('load', render);
        requist.addEventListener('error', errorRender);      
      
    
        requist.open('GET' , 'https://reqres.in/api/users?page=' + page);
        requist.send();
    }
    
    function render(){
        let response = this.responseText;
        let responseData = JSON.parse(response); 

        
        var fragment = document.createDocumentFragment();
        responseData.data.forEach( item => {
            let li = document.createElement('li');
            let emailUser = document.createElement("p")
            emailUser.textContent=item.email;

            let imageUser = document.createElement('img');            
            imageUser.classList.add('image-block');
            imageUser.src = item.avatar;

            li.appendChild(imageUser);            
            li.appendChild(emailUser);

            fragment.appendChild(li);         

       


        });

            document.getElementById('ul').innerHTML = ' ';
            document.getElementById('ul').appendChild (fragment);

            totalPages = responseData.total_pages;
        }

        function errorRender(){
            if (error === 404) {
                let p =document.createElement('p');
                p.textContent = 'server error';
                document.getElementById("div").appendChild(p);

                
            } else {
                console.log('page not found' );
            }
        }

        document.getElementById("loadprevious").addEventListener('click', function() {
            if (currentPage == 1) {
                return;
            }
            currentPage -= 1 ;
            getUsers(currentPage);

        });
    

        document.getElementById("loadmore").addEventListener('click', function() {
                if (currentPage == totalPages) {
                    return;
                }
                currentPage +=1;
                getUsers(currentPage);


        });
    

        getUsers( currentPage);