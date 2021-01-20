var documenterSearchIndex = {"docs":
[{"location":"api/#API-1","page":"API","title":"API","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"","category":"page"},{"location":"api/#","page":"API","title":"API","text":"Modules = [Wrangling]","category":"page"},{"location":"api/#Wrangling.contains-Tuple{Any,Any}","page":"API","title":"Wrangling.contains","text":"contains(haystack, needle)\n\nThis is the same as Base.occurin(needle, haystack), just with the arguments reversed. This makes it line up with startswith and endswith.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wrangling.contains-Tuple{Any}","page":"API","title":"Wrangling.contains","text":"contains(needle) -> Function\n\nCurried form of contains(haystack, needle)\n\n\n\n\n\n","category":"method"},{"location":"api/#Wrangling.contains_any-Tuple{Any,Any}","page":"API","title":"Wrangling.contains_any","text":"contains_any(haystack, needles)\n\nGiven a list of needles, this returns true if contains would return true for any needle in that list.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wrangling.contains_any-Tuple{Any}","page":"API","title":"Wrangling.contains_any","text":"contains_any(needles) -> Function\n\nCurried form of contains_any(haystack, needles)\n\n\n\n\n\n","category":"method"},{"location":"api/#Wrangling.endswith_any-Tuple{Any,Any}","page":"API","title":"Wrangling.endswith_any","text":"endswith_any(haystack, needles)\n\nGiven a list of needles, this returns true if endswith would return true for any needle in that list.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wrangling.endswith_any-Tuple{Any}","page":"API","title":"Wrangling.endswith_any","text":"endswith_any(needles) -> Function\n\nCurried form of endswith_any(haystack, needles)\n\n\n\n\n\n","category":"method"},{"location":"api/#Wrangling.startswith_any-Tuple{Any,Any}","page":"API","title":"Wrangling.startswith_any","text":"startswith_any(haystack, needles)\n\nGiven a list of needles, this returns true if startswith would return true for any needle in that list.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wrangling.startswith_any-Tuple{Any}","page":"API","title":"Wrangling.startswith_any","text":"startswith_any(needles) -> Function\n\nCurried form of startswith_any(haystack, needles)\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.endswith-Tuple{Any}","page":"API","title":"Base.endswith","text":"endswith(needle) -> Function\n\nCurried form of endswith(haystack, needle)\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.startswith-Tuple{Any}","page":"API","title":"Base.startswith","text":"startswith(needle) -> Function\n\nCurried form of startswith(haystack, needle)\n\n\n\n\n\n","category":"method"},{"location":"symbol_searching/#Working-with-Symbols-1","page":"Working with Symbols","title":"Working with Symbols","text":"","category":"section"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"Tables use Symbols to represent column names. Often one thus wants to do various filters on Symbols.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"Most filtering functions only accept strings, so code contains a lot of code like:","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"filter(col_name->startswith(colname, \"temperature\"), String.(names(df)))","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"We solve that by making functions that accept Symbol for all the arguments that would otherwise be strings. Similarly, while some functions like isequal and in have curried varients, like in(collection) being the same as item->in(item, collection), not all do. We add the missing ones.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"warning: Type Piracy\nWe type-pirate startwith and endswith to provide the single argument, and Symbol accepting versions. This is misdemeanor type-piracy: it only turns code which currently errors into non-errors. It is also the only reasonable definition for these methods. We don't type-pirate occursin as we replace that with contains which follows the consistent argument order.","category":"page"},{"location":"symbol_searching/#Functions-1","page":"Working with Symbols","title":"Functions","text":"","category":"section"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"These are basically all variants of existing functions.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"contains(haystack, needle) is an argument order reversed version of occursin(needle, haystack). It matches startswith and endswith.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"contains, startswith, endswith, and all their varients mentioned here, accept Symbols everywhere they might accept Strings.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"The curried varients are check(needle) == haystack->check(haystack, needle). We have them for contains, startswith, endswith, and all their varients.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"The any varients are startswith_any, endswith_any,  and contains_any. They are of the form:","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"check_any(needles, haystack) == any(check(haystack, needle) for needle in needles)","category":"page"},{"location":"symbol_searching/#Examples-1","page":"Working with Symbols","title":"Examples","text":"","category":"section"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"Consider if I had a list of column names, to do with prices and weather in various cities. Where the column names include the city and kind of data it is about.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"I might want just the columns names that are for a particular city:","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"julia> using Wrangling\n\njulia> const column_names =  [:NY_temperature, :NY_house_price, :NY_car_price, :NY_rainfall, :LON_temperature, :LON_house_price, :LON_car_price, :LON_rainfall];\n\njulia> const LON_cols = filter(startswith(:LON), column_names)\n4-element Array{Symbol,1}:\n :LON_temperature\n :LON_house_price\n :LON_car_price\n :LON_rainfall","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"Another thing I might want to do, is get just the ones that are to do with weather.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"julia> const weather_cols = filter(contains_any((:temperature, :rainfall)), column_names)\n4-element Array{Symbol,1}:\n :NY_temperature\n :NY_rainfall\n :LON_temperature\n :LON_rainfall","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"Or we might want to do the opposite and exclude any to do with weather:","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"julia> const nonweather_cols = filter(!contains_any((:temperature, :rainfall)), column_names)\n4-element Array{Symbol,1}:\n :NY_house_price\n :NY_car_price\n :LON_house_price\n :LON_car_price","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"Or I might want to get only price data for only one city.","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"julia> const LON_prices = filter(contains(r\"^LON_.*_price$\"), column_names)\n2-element Array{Symbol,1}:\n :LON_house_price\n :LON_car_price","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"What if we want all columns that are either for a particular city, or that are for rainfall anywhere:","category":"page"},{"location":"symbol_searching/#","page":"Working with Symbols","title":"Working with Symbols","text":"julia> const LON_or_rainfall_cols = filter(col -> startswith(col, :LON) || endswith(col, :rainfall), column_names)\n5-element Array{Symbol,1}:\n :NY_rainfall\n :LON_temperature\n :LON_house_price\n :LON_car_price\n :LON_rainfall","category":"page"},{"location":"#Wrangling.jl-1","page":"Home","title":"Wrangling.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Wrangling.jl is a package to make data wrangling easier. It works well along side packages like Tables.jl and DataFrames.jl.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"}]
}