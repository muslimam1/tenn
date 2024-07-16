let elUserName = document.querySelector('.username');
let elNavBarList = document.querySelector('.list');
let elModalWrapper = document.querySelector('.modal-wrapper');

let navbarItem1 = document.querySelector('.navbar-item1');
let navbarItem2 = document.querySelector('.navbar-item2');
let elTableBody = document.querySelector('.table-body');

const userData = JSON.parse(window.localStorage.getItem('userData')) || {};
elUserName.textContent = userData.username;

let poolProducts = JSON.parse(window.localStorage.getItem('products')) || [];

function handleClickLogoutBtn() {
    let confirmLogout = confirm('Do you want to log out?');
    if (confirmLogout) {
        location.pathname = 'index.html';
        window.localStorage.clear();
    }
}

elNavBarList.addEventListener('click', function(e) {
    if (e.target.matches('.navbar-item1')) {
        e.target.className = "navbar-item1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] border-[#009398]";
        e.target.nextElementSibling.className = "navbar-item2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] pb-[8px]";
        renderProducts(poolProducts, elTableBody, "0");
    } else if (e.target.matches('.navbar-item2')) {
        e.target.className = "navbar-item2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] pb-[8px]";
        e.target.previousElementSibling.className = "navbar-item1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] border-[#009398]";
        renderProducts(poolProducts, elTableBody, "1");
    }
});

// Render Products start
function renderProducts(poolProducts, elTableBody, key) {
    elTableBody.innerHTML = "";
    poolProducts.filter(item => item.categoryId === key).forEach((item) => {
        let elTR = document.createElement('tr');
        elTR.className = "bg-white";
        elTR.innerHTML = `
            <td class="py-[14px] text-center rounded-tl-[30px] rounded-bl-[30px]">
                <img class="mx-auto" src=${item.imgUrl} alt="Pool Img" width="110" height="41">
            </td>
            <td class="py-[14px] flex flex-col">
                <div class="relative w-[83px]">
                    <span class="text-[12px] leading-[13px] text-[#A6A6A6]">${item.oldPrice} сум</span>
                    <img class="absolute top-0 bottom-0 right-0 left-0 m-auto" src="./images/Admin/Line.svg" alt="Line" width="100%">
                </div>
                <span class="font-bold text-[16px] leading-[17px] text-[#009398]">${item.newPrice} сум</span>
            </td>
            <td class="py-[14px] text-[20px] text-center">${item.count}</td>
            <td class="py-[14px] text-[20px]">
                ${item.frame === "1" ? "Малярническая" : item.frame === "2" ? "Рамка пугачёв" : ""}
            </td>
            <td class="py-[14px] space-x-[10px] rounded-tr-[30px] rounded-br-[30px]">
                <button>
                    <img src="./images/Admin/update-icon.svg" alt="Update Icon" width="22" height="22">
                </button>
                <button>
                    <img src="./images/Admin/delete-icon.svg" alt="Delete Icon" width="22" height="22">
                </button>
            </td>
        `;
        list.appendChild(elTR);
    });
}
renderProducts(poolProducts, elTableBody, "0");
// Render Products end


function handleClickAddBtn() {
    elModalWrapper.classList.replace("scale-0", "scale-100");
    elModalWrapper.innerHTML = `
        <div class="modal modal-form relative px-[186px] w-[1138px] pt-[41px] pb-[43px] bg-gray-300 mx-auto rounded-[35px]">
            <button class="absolute top-0 right-0 m-[10px]" onclick="closeModal()">
                <img src="./images/Admin/close-icon.svg" alt="Close">
            </button>
            <form class="form flex flex-wrap gap-[30px] justify-between" id="addForm">
                <label class="flex flex-col gap-[13px] w-[48%]">
                    <span class="text-[22px] font-bold pl-[10px]">Категория</span>
                    <select name="category" class="full py-[20px] pl-[10px] rounded-[20px] outline-none inline-block">
                        <option value="0">Карасиные</option>
                        <option value="1">Надувные</option>
                    </select>
                </label>
                <label class="flex flex-col gap-[13px] w-[48%]">
                    <span class="text-[22px] font-bold pl-[10px]">Старая цена (сум)</span>
                    <input name="oldPrice" class="full focus:shadow-lg py-[20px] pl-[ ] rounded-[20px] outline-none inline-block type="number" placeholder="Старая цена (сум)">
                </label>
                <label class="flex flex-col gap-[13px] w-[48%]">
                    <span class="text-[22px] font-bold pl-[10px]">Новая цена (сум)</span>
                    <input name="newPrice" class="full focus:shadow-lg py-[20px] pl-[10px] rounded-[20px] outline-none inline-block type="number" placeholder="Новая цена (сум)">
                </label>
                <label class="flex flex-col gap-[13px] w-[48%]">
                    <span class="text-[22px] font-bold pl-[10px]">Идти на скидки (сум)</span>
                    <input name="newPrice" class="full focus:shadow-lg py-[20px] pl-[10px] rounded-[20px] outline-none inline-block type="number" placeholder="Цена со скидкой (сум)">
                </label>
                <label class="flex flex-col gap-[13px] w-[48%]">
                    <span class="text-[22px] font-bold pl-[10px]">Рамка</span>
                    <select name="frame" class="full py-[20px] pl-[10px] rounded-[20px] outline-none inline-block">
                        <option value="1">Малярническая</option>
                        <option value="2">Рамка пугачёв</option>
                    </select>
                </label>
                <label class="flex flex-col gap-[13px] w-[48%]">
                    <span class="text-[22px] font-bold pl-[10px]">Количество</span>
                    <input name="count" class="full focus:shadow-lg py-[20px] pl-[10px] rounded-[20px] outline-none inline-block type="number" placeholder="Количество">
                </label>
                <label class="flex flex-col gap-[13px] w-full">
                    <span class="text-center mt-[33px]">
                        <img src="./images/Admin/upload-img.png" alt="Upload" width="316">
                    </span>
                    <input type="file" class="hidden" name="imgUrl" id="fileInput">
                    <label for="fileInput" class="button flex items-center justify-center mt-[33px] w-full h-[46px] cursor-pointer bg-[#009398] text-white text-[20px] font-bold rounded-[29px]">Загрузить изображение</label>
                </label>
                <button class="button w-full h-[46px] cursor-pointer bg-[#009398] text-white text-[20px] font-bold rounded-[29px]" id="submitForm" type="submit">Добавить продукт</button>
            </form>
        </div>
    `;
}

let elChangeImg = document.querySelector('.changeImgUrl');
let elRenderImg = document.querySelector('.render-img');
let elSubmitForm = document.querySelector('.modal-form');
elChangeImg.addEventListener('change', function(evt) {
    elRenderImg.src = URL.createObjectURL(evt.target.files[0]);
});


// Create start
elSubmitForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const data = {
        imgUrl: elRenderImg.src,
        category: evt.target.category.value,
        oldPrice: evt.target.oldPrice.value,
        newPrice: evt.target.newPrice.value,
        frame: evt.target.frame.value,
        count: evt.target.count.value
    };
    poolProducts.push(data);
    window.localStorage.setItem('products', JSON.stringify(poolProducts));
    elModalWrapper.classList.replace("scale-100", "scale-0");
    renderProducts(poolProducts, elTableBody, data.categoryId);
    if (data.categoryId === "1") {
        navbarItem1.className = "navbar-item2 font-bold text-[35px] leading-[40px] text-[#A6A6A6] pb-[8px]"
        navbarItem2.className = "nabvar-item1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009393] border-b-[3px] border-[#009393]"
    }
})
