<?php
session_start();
if (!$_SESSION['user']) {
    header('Location: login.php');
}
require_once 'database.php';
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home - Todo App</title>
    <?php include '_styles.php'; ?>
</head>

<body>
    <nav id="navbar-main" class="navbar navbar-main navbar-expand-lg navbar-light py-2">
        <div class="container">
            <a class="navbar-brand mr-auto" href="/">
                <img src="/assets/img/todo.png">
            </a>
            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link py-2" data-toggle="dropdown" href="#" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text"><?php echo $_SESSION['user']['name'] ?></span>
                    </a>
                    <div class="dropdown-menu">
                        <a id="logout-button" href="#" class="dropdown-item py-1">Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <section class="section section-shaped section-md">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container">
            <h1 class="app-title">todos</h1>
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="card bg-secondary shadow border-0">
                        <div class="card-header bg-white">
                            <div class="empty-state text-muted text-center">
                                <h2 id="empty-state" class="empty-state__title d-none">Add your first todo</h2>
                                <p class="empty-state__description">What do you want to get done today?</p>
                            </div>
                            <ul class="list-group js-todo-list"></ul>
                        </div>
                        <div class="card-body px-lg-5 py-lg-5">
                            <form role="form" class="js-form">
                                <div class="form-group mb-3">
                                    <div class="input-group input-group-alternative">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ni ni-fat-add"></i></span>
                                        </div>
                                        <input class="form-control js-todo-input" placeholder="e.g Build a web app" autofocus type="text" id="js-input" autocomplete="username" required>
                                    </div>
                                    <p id="error-message"></p>
                                </div>

                                <div class="text-center">
                                    <button id="js-submit" type="submit" class="btn btn-primary btn-block mt-4">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="d-none">
        <svg>
            <defs>
                <symbol id="delete-icon" viewBox="0 0 448 448">
                    <path d="m224 0c-123.710938 0-224 100.289062-224 224s100.289062 224 224 224 224-100.289062 224-224c-.132812-123.65625-100.34375-223.867188-224-224zm124.449219 325.824219c4.15625 4.015625 5.828125 9.964843 4.363281 15.558593s-5.835938 9.964844-11.429688 11.429688-11.542968-.207031-15.558593-4.363281l-101.824219-101.824219-101.824219 101.824219c-6.277343 6.0625-16.257812 5.976562-22.429687-.195313s-6.257813-16.152344-.195313-22.429687l101.824219-101.824219-101.824219-101.824219c-4.15625-4.015625-5.828125-9.964843-4.363281-15.558593s5.835938-9.964844 11.429688-11.429688 11.542968.207031 15.558593 4.363281l101.824219 101.824219 101.824219-101.824219c6.277343-6.0625 16.257812-5.976562 22.429687.195313s6.257813 16.152344.195313 22.429687l-101.824219 101.824219zm0 0" fill="#D80027" />
                </symbol>
            </defs>
        </svg>

    </div>
    <?php include '_scripts.php'; ?>
    <script src="/assets/js/script.js"></script>
</body>

</html>