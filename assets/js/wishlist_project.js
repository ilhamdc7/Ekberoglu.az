//localStorage.clear();

var media_project = 'https://master.acobaz.com/media/project/';
var media_product = 'https://master.acobaz.com/media/product_images/';

if (localStorage.getItem('wish_project_list') === null) {
    var wish_project_list = {
        userId: localStorage.getItem('userId'),
        project_id: [],
        project_name: [],
        project_slug: [],
        category: [],
        project_image: [],
        count: 0,
    };
    localStorage.setItem('wish_project_list', JSON.stringify(wish_project_list));
}

if (localStorage.getItem('wish_product_list') === null) {
    var wish_product_list = {
        userId: localStorage.getItem('userId'),
        product_id: [],
        product_name: [],
        product_slug: [],
        product_image: [],
        count: 0,
    };
    localStorage.setItem('wish_product_list', JSON.stringify(wish_product_list));
}

function wishlistCheck() {
    var wish_project_list = JSON.parse(localStorage.wish_project_list);
    for (var i = 0; i < wish_project_list.count; i++) {
        for (var j = 0; j < document.querySelectorAll('.fa-heart-' + wish_project_list.project_id[i]).length; j++) {
            document.querySelectorAll('.fa-heart-' + wish_project_list.project_id[i])[j].className = 'fa-heart-' + wish_project_list.project_id[i] + ' fa fa-heart';
        }
    }

    var wish_product_list = JSON.parse(localStorage.wish_product_list);
    for (var i = 0; i < wish_product_list.count; i++) {
        for (var j = 0; j < document.querySelectorAll('.fa-heart-' + wish_product_list.product_id[i]).length; j++) {
            document.querySelectorAll('.fa-heart-' + wish_product_list.product_id[i])[j].className = 'fa-heart-' + wish_product_list.product_id[i] + ' fa fa-heart';
        }
    }
}

if (url[3] !== 'beyendiklerim') {
    wishlistCheck();
}

if (url[3] === 'beyendiklerim') {
    wishlistViewPage();
}

function addWish_project_list(id) {
    var wish_project_list = JSON.parse(localStorage.wish_project_list);
    if (wish_project_list.project_id.indexOf(id) > -1) {
        deleteWish_project_list(id);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
        Toast.fire({
            title: "Uğurlu!",
            icon: 'success',
            text: 'Lahiyə bəyəndiklərimdən silindi',
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/beyendiklerim-layihe-elave",
            data: {
                _token: token,
                id: id
            },
            success: function(data) {
                console.log(data);
                if (data[0] === 1) {
                    addWish_project_listData(data[1]);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    })
                    Toast.fire({
                        title: "Uğurlu!",
                        icon: 'success',
                        text: 'Lahiyə bəyəndiklərimə əlavə olundu',
                    })
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    })
                    Toast.fire({
                        title: "Bir xəta baş verdi!",
                        text: 'Xahiş olunur sonra bir daha cəhd edin',
                        icon: "error",
                    })
                }
            },

            error: function(x, sts) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
                Toast.fire({
                    title: "Bir xəta baş verdi!",
                    icon: 'error',
                    text: 'Zəhmət olmasa internet bağlantınızı yoxlayın və yeniden bir daha cəhd edin',
                })
            },
        });
    }
}

function addWish_product_list(id) {
    var wish_product_list = JSON.parse(localStorage.wish_product_list);
    if (wish_product_list.product_id.indexOf(id) > -1) {
        deleteWish_product_list(id);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

        })
        Toast.fire({
            title: "Uğurlu!",
            icon: 'success',
            text: 'Məhsul bəyəndiklərimdən silindi',
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/beyendiklerim-mehsul-elave",
            data: {
                _token: token,
                id: id
            },
            success: function(data) {
                if (data[0] === 1) {
                    addWish_product_listData(data[1]);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    })
                    Toast.fire({
                        title: "Uğurlu!",
                        icon: 'success',
                        text: 'Məhsul bəyəndiklərimə əlavə olundu',
                    })
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    })
                    Toast.fire({
                        title: "Bir xəta baş verdi!",
                        text: 'Xahiş olunur sonra bir daha cəhd edin',
                        icon: "error",
                    })
                }
            },

            error: function(x, sts) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
                Toast.fire({
                    title: "Bir xəta baş verdi!",
                    icon: 'error',
                    text: 'Zəhmət olmasa internet bağlantınızı yoxlayın və yeniden bir daha cəhd edin',
                })
            },
        });
    }
}

function addWish_project_listData(data) {
    var project = data[0];
    var image = data[1];
    var category = data[2];
    var wish_project_list = JSON.parse(localStorage.wish_project_list);
    if (project['common_area'] == null) {
        wish_project_list.project_name.push(project['name'])
    } else {
        wish_project_list.project_name.push(project['name'] + ' / ' + project['common_area'] + ' m²')
    }
    wish_project_list.project_id.push(project['id']);
    wish_project_list.project_slug.push(url[0] + url[1] + '//' + url[2] + '/layihe/' + category['slug'] + '/' + project['slug']);
    wish_project_list.project_image.push(`${media_project}${image[0]['project_general_id']}/${image[0]['image']}`);
    wish_project_list.count++;
    localStorage.wish_project_list = JSON.stringify(wish_project_list);
    for (var i = 0; i < document.querySelectorAll('.fa-heart-' + project['id']).length; i++) {
        document.querySelectorAll('.fa-heart-' + project['id'])[i].className = 'fa-heart-' + project['id'] + ' fa fa-heart'
    }
}

function addWish_product_listData(data) {
    var product = data[0];
    var wish_product_list = JSON.parse(localStorage.wish_product_list);
    wish_product_list.product_id.push(product['id']);
    wish_product_list.product_name.push(product['name']);
    wish_product_list.product_slug.push(url[0] + url[1] + '//' + url[2] + '/mehsul/' + product['id'] + '/' + product['slug']);
    wish_product_list.product_image.push(`${media_product}/${product['id']}/${product['cover']}`);
    wish_product_list.count++;
    localStorage.wish_product_list = JSON.stringify(wish_product_list);
    for (var i = 0; i < document.querySelectorAll('.fa-heart-' + product['id']).length; i++) {
        document.querySelectorAll('.fa-heart-' + product['id'])[i].className = 'fa-heart-' + product['id'] + ' fa fa-heart'
    }
}

function deleteWish_project_list(id) {
    var wish_project_list = JSON.parse(localStorage.wish_project_list);
    var index = wish_project_list.project_id.indexOf(id);
    if (index > -1) {
        wish_project_list.project_id.splice(index, 1);
        wish_project_list.project_name.splice(index, 1);
        wish_project_list.project_slug.splice(index, 1);
        wish_project_list.project_image.splice(index, 1);
        wish_project_list.count--;
    }
    for (var i = 0; i < document.querySelectorAll('.fa-heart-' + id).length; i++) {
        document.querySelectorAll('.fa-heart-' + id)[i].className = 'fa-heart-' + id + ' fa fa-heart-o'
    }
    localStorage.wish_project_list = JSON.stringify(wish_project_list);

    if (url[3] === 'beyendiklerim') {
        wishlistViewPage();
    }
}

function deleteWish_product_list(id) {
    var wish_product_list = JSON.parse(localStorage.wish_product_list);
    var index = wish_product_list.product_id.indexOf(id);
    if (index > -1) {
        wish_product_list.product_id.splice(index, 1);
        wish_product_list.product_name.splice(index, 1);
        wish_product_list.product_slug.splice(index, 1);
        wish_product_list.product_image.splice(index, 1);
        wish_product_list.count--;
    }
    for (var i = 0; i < document.querySelectorAll('.fa-heart-' + id).length; i++) {
        document.querySelectorAll('.fa-heart-' + id)[i].className = 'fa-heart-' + id + ' fa fa-heart-o'
    }
    localStorage.wish_product_list = JSON.stringify(wish_product_list);

    if (url[3] === 'beyendiklerim') {
        wishlistViewPage();
    }
}

function wishlistViewPage() {
    var wish_project_list = JSON.parse(localStorage.wish_project_list);
    var wish_product_list = JSON.parse(localStorage.wish_product_list);
    var wish_project_list_page_body = document.getElementById('wish_project_list_page_body');
    // var wish_product_list_page_body = document.getElementById('wish_product_list_page_body');
    wish_project_list_page_body.innerHTML = ``;
    // wish_product_list_page_body.innerHTML = ``;
    if (wish_project_list.count === 0) {
        wish_project_list_page_body.innerHTML += `
        <tr class="text-center">
             <td class="product-name" >Bəyənilmiş layihə yoxdur...</td>
        </tr>
        `;
    } else {
        for (var i = 0; i < wish_project_list.count; i++) {
            wish_project_list_page_body.innerHTML += `
               <tr class="justify-content-between">
                    <td class="product-thumbnail w-25"><a target="_blank" href="${wish_project_list.project_slug[i]}"><img src="${wish_project_list.project_image[i]}" alt="item"></a></td>
                    <td class="text-center w-50"><a target="_blank" href="${wish_project_list.project_slug[i]}">${wish_project_list.project_name[i]}</a></td>
                    <td class="text-center"><a href="javascript:void(0)"<i onclick="deleteWish_project_list(${wish_project_list.project_id[i]})" class="far fa-trash-alt"></i></a></td>
                </tr>`;
        }
    }

    // if (wish_product_list.count === 0) {
    //     wish_product_list_page_body.innerHTML += `
    //     <tr class="text-center">
    //          <td class="product-name" >Bəyənilmiş Məhsul yoxdur...</td>
    //     </tr>
    //     `;
    // } else {
    //     for (var i = 0; i < wish_product_list.count; i++) {
    //         wish_product_list_page_body.innerHTML += `
    //           <tr  class="justify-content-between">
    //                 <td class="product-thumbnail  w-25"><a target="_blank" href="${wish_product_list.product_slug[i]}"><img src="${wish_product_list.product_image[i]}" alt="item"></a></td>
    //                 <td  class="text-center  w-50"><a target="_blank" href="${wish_product_list.product_slug[i]}">${wish_product_list.product_name[i]}</a></td>
    //                 <td class="text-center"><a href="javascript:void(0)"<i onclick="deleteWish_product_list(${wish_product_list.product_id[i]})" class="far fa-trash-alt"></i></a></td>
    //             </tr>`
    //         ;
    //     }
    // }
}