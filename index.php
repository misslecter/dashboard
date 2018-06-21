<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
    <link rel="stylesheet" href="./assets/css/app.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
</head>
<body class="app-background-default">

<header>
    <button>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </button>

    <div class="clock"></div>

    <!--    <a href="#" id="test">Change</a>-->
    <!---->
    <!--    <div class="link">-->
    <!--        <a href="#contact" class="link-contact">Contact us</a>-->
    <!--    </div>-->

    <div class="settings">
        <a href="#" class="open-settings-menu">
            <span></span>
            <span></span>
            <span></span>
        </a>
        <div class="settings-menu">
            <div>
                <h2>App theme</h2>
                <input type="checkbox" id="app-theme-selector" checked/>
                <label for="app-theme-selector" data-light="light" data-dark="dark"></label>
            </div>
            <div>
                <h2>Background</h2>
                <input type="radio" id="app-background-default" name="app-background-selector">
                <label for="app-background-default" class="app-background-change">Default</label>
                <input type="radio" id="app-background-flickr" name="app-background-selector">
                <label for="app-background-flickr" class="app-background-change">
                    Flickr
                    <a href="#" id="refreshBg" class="disabled">refresh</a>
                </label>
                <input type="radio" id="app-background-custom" name="app-background-selector">
                <label for="app-background-custom" class="app-background-change">
                    Custom
                    <input type="file" id="file-selector" disabled>
                    <label for="file-selector">choose image</label>
                </label>
            </div>
            <div>
                <a href="#contact" class="link-contact">Contact us</a>
            </div>
        </div>
    </div>
</header>

<nav>

    <div class="logo">
        <?php include 'assets/images/logo.svg'; ?>
        <img src="./assets/images/logo.png" alt="Logo">
    </div>

    <div class="nav-content">
        <h2>Notes</h2>
        <ul id="nav-notes">
            <li class="nothing">There are no notes to navigate</li>
        </ul>

        <h2>Todos</h2>
        <ul id="nav-todos">
            <li class="nothing">There are no todos to navigate</li>
        </ul>

        <h2>Counters</h2>
        <ul id="nav-counters">
            <li class="nothing">There are no counters to navigate</li>
        </ul>
    </div>

</nav>

<main id="dashboard">
    <div class="add-new">
        <div class="add-new__choice">
            <ul>
                <li><a href="" data-target="note">Note</a></li>
                <li><a href="" data-target="todo">Todo</a></li>
                <li><a href="" data-target="counter">Counter</a></li>
            </ul>
        </div>
        <button><i class="fa fa-plus fa-3x"></i></button>
    </div>
</main>

<section class="welcome" id="welcome">
    <div class="logo">
        <h1>Welcome to</h1>
        <div>
            <?php include 'assets/images/logo.svg'; ?>
            <img src="./assets/images/logo.png" alt="Logo">
        </div>
    </div>
    <div class="btns-holder">
        <a href="#dashboard" class="btn empty">Start with empty dashboard</a>
        <a href="#dashboard" class="btn sample">Load sample data</a>
    </div>
</section>

<section class="contact" id="contact">

    <a href="#dashboard" class="link-close fa fa-times fa-lg"></a>

    <div class="paper">
        <div class="logo">
            <h1>Tell us what you think about</h1>
            <div>
                <?php include 'assets/images/logo.svg'; ?>
                <img src="./assets/images/logo.png" alt="Logo">
            </div>
        </div>

        <form id="ajax-contact" method="post" action="send-mail.php">
            <input type="text" id="name" name="name" required placeholder="Name">
            <label for="name">Name:</label>
            <input type="email" id="email" name="email" required placeholder="Email">
            <label for="email">Email:</label>
            <textarea id="message" name="message" required placeholder="Message"></textarea>
            <label for="message">Message:</label>
            <button type="submit">Send</button>
        </form>

        <div id="form-messages"></div>
    </div>

</section>


<script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<!--todo-->
<!--<script src="./assets/masonry.pkgd.min.js"></script>-->
<script src="./assets/js/dist/app.js"></script>
</body>
</html>