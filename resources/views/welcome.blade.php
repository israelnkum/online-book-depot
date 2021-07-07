<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Online Stationery Depot</title>

        <link href="{{ asset('css/app-landing.css') }}" rel="stylesheet">
        <!-- Fonts -->
{{--        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">--}}
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
    </head>
    <body class="antialiased">
    <div id="lading-page"></div>
    <script src="{{asset('/js/landing.js')}}"></script>
    </body>
</html>
