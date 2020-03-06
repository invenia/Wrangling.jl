using Documenter, Wrangling

makedocs(;
    modules=[Wrangling],
    format=Documenter.HTML(),
    pages=[
        "Home" => "index.md",
        "Working with Symbol" => "symbol_searching.md",
        "API" => "api.md",
    ],
    repo="https://github.com/invenia/Wrangling.jl/blob/{commit}{path}#L{line}",
    sitename="Wrangling.jl",
    authors="Invenia Technical Computing Corporation",
    assets=[
        "assets/invenia.css",
        "assets/logo.png",
    ],
    #strict=true,
)

deploydocs(;
    repo="github.com/invenia/Wrangling.jl",
)
