<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
    <link rel="stylesheet" href="./assets/css/app.css">
</head>
<body>

<header>
    <button>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </button>

    <div class="link">
        <a href="#" class="link-to-contact">Contact</a>
        <a href="#" class="link-to-dashboard" style="display: none;">Go back</a>
    </div>
</header>

<nav>

    <div class="logo">
        <?php include 'assets/images/logo.svg';?>
    </div>

    <ul>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
    </ul>
</nav>

<main id="dashboard">

    <!--<div class="module todo" draggable="true" >-->
        <!--Todo-->
    <!--</div>-->

    <!--<div class="module counter" draggable="true" >-->
        <!--Counter-->
    <!--</div>-->

    <!--<div class="module photo" draggable="true" >-->
        <!--Photo-->
    <!--</div>-->

    <div class="add-new">
        <div class="add-new__choice">
            <ul>
                <li><a href="#" data-target="note">Note</a></li>
                <li><a href="#" data-target="todo">Todo</a></li>
                <li><a href="#" data-target="counter">Counter</a></li>
                <li><a href="#" data-target="photo">Photo</a></li>
            </ul>
        </div>
        <button><i class="fa fa-plus fa-3x"></i></button>
    </div>
</main>



<section class="contact closed" id="contact">

    <form id="ajax-contact" method="post" action="send-mail.php">
        <div class="field">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div class="field">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>

        <div class="field">
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
        </div>

        <div class="field">
            <button type="submit">Send</button>
        </div>
    </form>

    <div id="form-messages"></div>

    <div class="paper"></div>
<!--    <div class="pen"></div>-->

</section>



<script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<!--<script src="dist/jquery-3.3.1.min.js"></script>-->
<script src="./assets/js/dist/app.js"></script>
</body>
</html>