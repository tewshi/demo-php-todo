<?php session_start();
session_unset(); ?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login - Todo App</title>
    <?php include '_styles.php'; ?>
</head>

<body>
    <nav id="navbar-main" class="navbar navbar-main navbar-expand-lg navbar-light py-2">
        <div class="container">
            <a class="navbar-brand mx-auto" href="/">
                <img src="/assets/img/todo.png">
            </a>
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
                        <div class="card-header bg-white pb-5">
                            <div class="text-muted text-center mb-3">Sign in with</div>
                            <div class="btn-wrapper text-center">
                                <a href="#" class="btn btn-neutral btn-icon">
                                    <span class="btn-inner--icon"><img src="/assets/img/icons/common/github.svg"></span>
                                    <span class="btn-inner--text">Github</span>
                                </a>
                                <a href="#" class="btn btn-neutral btn-icon">
                                    <span class="btn-inner--icon"><img src="/assets/img/icons/common/google.svg"></span>
                                    <span class="btn-inner--text">Google</span>
                                </a>
                            </div>
                        </div>
                        <div class="card-body px-lg-5 py-lg-5">
                            <div class="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                            <form role="form" class="js-login-form">
                                <div class="form-group mb-3">
                                    <div class="input-group input-group-alternative">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ni ni-single-02"></i></span>
                                        </div>
                                        <input class="form-control" placeholder="e.g john" autofocus type="text" id="js-username-input" autocomplete="username" required>
                                    </div>
                                    <p id="login-message"></p>
                                </div>
                                <div class="form-group focused">
                                    <div class="input-group input-group-alternative">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                        </div>
                                        <input class="form-control" placeholder="Password" type="password" id="js-password-input" autocomplete="current-password" required>
                                    </div>
                                </div>
                                <div class="custom-control custom-control-alternative custom-checkbox">
                                    <input class="custom-control-input" id="customCheckLogin" type="checkbox">
                                    <label class="custom-control-label" for="customCheckLogin"><span>Remember me</span></label>
                                </div>
                                <div class="text-center">
                                    <button id="js-submit" type="submit" class="btn btn-primary btn-block mt-4">Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light"><small>Forgot password?</small></a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="/signup.php" class="text-light"><small>Create account</small></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php include '_scripts.php'; ?>
    <script src="/assets/js/login.js"></script>
</body>

</html>