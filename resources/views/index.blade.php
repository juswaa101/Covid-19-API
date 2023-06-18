<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ __('Virotracker - Covid 19 Tracker') }}</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.png') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

        body {
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;
        }
    </style>
</head>

<body>
    {{-- Page Loader Before Component Shows --}}
    @include('loader.page-loader')

    <div id="content" class="hidden">
        <div class="grid mt-24 w-screen place-items-center">
            {{-- Search Component --}}
            <div class="grid items-center justify-center">
                <img src="{{ asset('images/covid-shield.png') }}" class="mx-auto" height="400" width="500">
                <h2 class="text-4xl text-teal-700 font-bold text-center">Virotracker - Covid 19 Tracker</h2>
                <p class="italic text-lg text-center text-gray-500">"We together as one, fight the viruses!"</p>
                <div class="flex rounded-lg mt-4 mx-auto">
                    <input type="text"
                        class="px-4 py-2 w-80 rounded-full mx-4 focus:ring-transparent focus:ring-1 focus:ring-teal-700"
                        placeholder="Search by Country or City" id="country">
                    <button id="search-country"
                        class="flex items-center text-white justify-center px-4 border-l rounded-full bg-teal-700 hover:bg-blue-700 text-white">
                        <svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                        <p class="mx-2">Search</p>
                    </button>
                </div>
                <span class="text-red-500 py-2 mx-24" id="message"></span>
            </div>

            {{-- Covid 19 Data List Result --}}
            <div class="container mx-auto px-4 md:px-4">
                <div class="flex flex-wrap -mx-1 lg:-mx-4" id="result">
                </div>
            </div>
        </div>
    </div>

    <button title="About" id="aboutModalButton" data-modal-target="aboutModal" data-modal-toggle="aboutModal"
        class="hidden fixed z-90 bottom-2 mb-24 right-8 bg-teal-700 w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700">&#8505;</button>
    <button title="Back to top" id="topButton"
        class="hidden fixed z-90 bottom-10 right-8 bg-teal-700 w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700">&uarr;</button>

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"
        integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
</body>

@include('modal.about-modal')

</html>

<script src="{{ asset('js/covid-19-api.js') }}"></script>
