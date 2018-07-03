/*
 * MODEL
 */
var model = {
    currentCat: null,
    adminVisible: false,
    allCats: [
        {
            name: 'Phil',
            count: 0,
            src: 'images/cute-cat-1.jpg'
        },
        {
            name: 'Max',
            count: 0,
            src: 'images/cute-cat-2.jpg'
        },
        {
            name: 'Shay',
            count: 0,
            src: 'images/cute-cat-3.jpg'
        },
        {
            name: 'Mel',
            count: 0,
            src: 'images/cute-cat-4.jpg'
        },
        {
            name: 'Idou',
            count: 0,
            src: 'images/cute-cat-5.jpg'
        }
        ]
};

/*
 * OCTOPUS
 */
var octopus = {
    init: function () {
        model.currentCat = model.allCats[0];

        viewList.init();
        viewImage.init();
        viewAdmin.init();
    },

    getCurrentCat: function () {
        return model.currentCat;
    },

    getAllCats: function () {
        return model.allCats;
    },

    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },

    increaseCount: function () {
        model.currentCat.count += 1;
        viewImage.render();
    },
    openAdminView: function () {
        this.adminForm = document.getElementById('adminForm');
        this.adminForm.style.display = 'block';
        model.adminVisible = true;
    },
    closeAdminView: function () {
        this.adminForm.style.display = 'none';
        model.adminVisible = false;
    },
    updateAdmin: function (name, url, clicks) {
        model.currentCat.name = name;
        model.currentCat.url = url;
        model.currentCat.count = clicks;
        this.closeAdminView();
        viewImage.render();
        viewList.render();
    }
};

/*
 * VIEW, list part
 */
var viewList = {
    init: function () {
        this.catList = document.getElementById('catList');
        this.render();
    },

    render: function () {
        var allCats = octopus.getAllCats();
        this.catList.innerHTML = '';

        allCats.forEach(function (cat) {
            var catNameItem = document.createElement('li');
            catNameItem.textContent = cat.name;
            catNameItem.className += 'cat-item';
            catNameItem.id = cat.name.toLowerCase();

            /* Use of closure thanks to an IIFE, essential while adding event listener inside a loop */
            catNameItem.addEventListener('click', (function (cat) {
                return function () {
                    octopus.setCurrentCat(cat);
                    viewAdmin.render();
                    viewImage.render();
                };
            })(cat));

            this.catList.appendChild(catNameItem);
        });


    }
};

/*
 * VIEW, image part
 */
var viewImage = {
    init: function () {
        this.cat = document.getElementById('cat');
        this.catName = document.getElementById('catName');
        this.catCount = document.getElementById('catCount');
        this.catImg = document.getElementById('catImg');

        this.catImg.addEventListener('click', function () {
            octopus.increaseCount();
        });

        this.render();
    },
    render: function () {
        var currentCat = octopus.getCurrentCat();
        this.catName.textContent = currentCat.name;
        this.catCount.textContent = currentCat.count;
        this.catImg.src = currentCat.src;
    }
};

/*
 * VIEW, image part
 */
var viewAdmin = {
    init: function () {
        this.adminBtn = document.getElementById('adminBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.cancelBtn = document.getElementById('cancelBtn');

        this.adminBtn.addEventListener('click', function () {
            event.preventDefault();
            octopus.openAdminView();
        });

        this.saveBtn.addEventListener('click', function () {
            event.preventDefault();
            var nameInput = document.getElementById('name').value;
            var urlInput = document.getElementById('url').value;
            var clickInput = document.getElementById('clicks').value;

            octopus.updateAdmin(nameInput, urlInput, clickInput);
        });

        this.cancelBtn.addEventListener('click', function () {
            event.preventDefault();
            octopus.closeAdminView();
        });

        this.render();
    },

    render: function () {
        var currentCat = octopus.getCurrentCat();

        var nameInput = currentCat.name;
        var urlInput = currentCat.src;
        var clickInput = currentCat.count;

        document.getElementById('name').value = nameInput;
        document.getElementById('url').value = urlInput;
        document.getElementById('clicks').value = clickInput;
    }

}


octopus.init();
