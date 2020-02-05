using Documenter, Wrangling

makedocs(;
    modules=[Wrangling],
    format=Documenter.HTML(),
    pages=[
        "Home" => "index.md",
    ],
    repo="https://github.com/invenia/Wrangling.jl/blob/{commit}{path}#L{line}",
    sitename="Wrangling.jl",
    authors="Invenia Technical Computing Corporation",
    assets=[
        "assets/invenia.css",
        "assets/logo.png",
    ],
)

deploydocs(;
    repo="github.com/invenia/Wrangling.jl",
)
