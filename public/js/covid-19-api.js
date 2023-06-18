$(window).on("load", function () {
    $("#page-loader").fadeOut(1000);
});

$(document).ready(function () {
    setTimeout(() => {
        $("#content").fadeIn(1000);
        $("#content").removeClass("hidden");
        $("#aboutModalButton").fadeIn(1000);
        $("#aboutModalButton").removeClass("hidden");
        $("#topButton").fadeIn(1000);
        $("#topButton").removeClass("hidden");
    }, 1000);

    let country = "";

    $("#search-country").click(function (e) {
        country = $("#country").val();
        $(this).html(`
            <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin fill-teal-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <p class="mx-1">Loading...</p>
        `);
        $(this).prop("disabled", true);

        const settings = {
            async: true,
            crossDomain: true,
            url: `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${country}`,
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    "95a7b0dfe7msh3b877987d9b2a15p1d91e2jsnec61d0abca8d",
                "X-RapidAPI-Host":
                    "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
        };

        $.ajax(settings).done((response) => {
            $(this).html(
                `<svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
                <p class="mx-2">Search</p>`
            );
            $(this).prop("disabled", false);

            $("#result").html("");

            if (response.statusCode === 200) {
                const covidList = response.data.covid19Stats;
                if (country.length > 0) {
                    removeMessage();
                    covidList.forEach((covidInfo) => {
                        $("#result").append(`
                            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                <article class="overflow-hidden rounded-lg shadow-lg border border-teal-700">
                                    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 class="text-lg">
                                            <a class="text-center text-3xl font-bold no-underline hover:underline text-black" href="#">
                                                ${covidInfo.country}
                                            </a>
                                            <div>Province: <span class="text-gray-500 font-bold">${
                                                covidInfo.province
                                            }</span></div>
                                            <div>Confirmed: <span class="${
                                                covidInfo.confirmed
                                                    ? "text-amber-500 font-bold"
                                                    : "text-gray-500 font-bold"
                                            }">${
                            covidInfo.confirmed
                        }</span></div>
                                            <div>Recovered: <span class="${
                                                covidInfo.recovered
                                                    ? "text-green-500 font-bold"
                                                    : "text-gray-500 font-bold"
                                            }">${
                            covidInfo.recovered
                        }</span></div>
                                            <div>Deaths: <span class="${
                                                covidInfo.deaths
                                                    ? "text-red-500 font-bold"
                                                    : "text-gray-500 font-bold"
                                            }">${covidInfo.deaths}</span></div>
                                        </h1>
                                    </header>
                                </article>
                            </div>
                        `);
                    });
                } else {
                    printMessage("Please type a country or city");
                }
            }
        });
    });

    $("#topButton").click(function (e) {
        $(window.opera ? "html" : "html, body").animate(
            {
                scrollTop: 0,
            },
            "slow"
        );
    });

    function printMessage(message) {
        $("#message").html(`
            <svg fill="none" class="w-8 h-8 inline" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
            </svg> ${message}
        `);
    }

    function removeMessage() {
        $("#message").html("");
    }
});
