# Working with Symbols

Tables use `Symbol`s to represent column names.
Often one thus wants to do various filters on `Symbol`s.

Most filtering functions only accept strings, so code contains a lot of code like:
```julia
filter(col_name->startswith(colname, "temperature"), Symbol.(names(df)))
```

We solve that by making functions that accept `Symbol` for all the arguments that would otherwise be strings.
Similarly, while some functions like `isequal` and `in` have _curried_ varients, like `in(collection)` being the same as `item->in(item, collection)`,
not all do.
We add the missing ones.


!!! warning "Type Piracy"
    We type-pirate `startwith` and `endswith` to provide the single argument, and `Symbol` accepting versions.
    This is misdemeanor type-piracy: it only turns code which currently errors into non-errors.
    It is also the only reasonable definition for these methods.
    We don't type-pirate `occursin` as we replace that with [`contains`](@ref) which follows the consistent argument order.


## Functions
These are basically all variants of existing functions.

 [`contains(haystack, needle)`](@ref contains) is an argument order reversed version of `occursin(needle, haystack)`. It matches `startswith` and `endswith`.

`contains`, `startswith`, `endswith`, and all their varients mentioned here, accept `Symbol`s everywhere they might accept `String`s.

The curried varients are `check(needle) == haystack->check(haystack, needle)`.
We have them for `contains`, `startswith`, `endswith`, and all their varients.

The `any` varients are [`startswith_any`](@ref), [`endswith_any`](@ref),  and [`contains_any`](@ref).
They are of the form:
```julia
check_any(needles, haystack) == any(check(haystack, needle) for needle in needles)
```

## Examples

Consider if I had a list of column names, to do with prices and weather in various cities.
Where the column names include the city and kind of data it is about.

I might want just the columns names that are for a particular city:
```jldoctest symbol_searching
julia> using Wrangling

julia> const column_names =  [:NY_temperature, :NY_house_price, :NY_car_price, :NY_rainfall, :LON_temperature, :LON_house_price, :LON_car_price, :LON_rainfall];

julia> const LON_cols = filter(startswith(:LON), column_names)
4-element Array{Symbol,1}:
 :LON_temperature
 :LON_house_price
 :LON_car_price
 :LON_rainfall
```

Another thing I might want to do, is get just the ones that are to do with weather.

```jldoctest symbol_searching
julia> const weather_cols = filter(contains_any((:temperature, :rainfall)), column_names)
4-element Array{Symbol,1}:
 :NY_temperature
 :NY_rainfall
 :LON_temperature
 :LON_rainfall
```
Or we might want to do the opposite and exclude any to do with weather:
```jldoctest symbol_searching
julia> const nonweather_cols = filter(!contains_any((:temperature, :rainfall)), column_names)
4-element Array{Symbol,1}:
 :NY_house_price
 :NY_car_price
 :LON_house_price
 :LON_car_price
```

Or I might want to get only price data for only one city.
```jldoctest symbol_searching
julia> const LON_prices = filter(contains(r"^LON_.*_price$"), column_names)
2-element Array{Symbol,1}:
 :LON_house_price
 :LON_car_price
```


What if we want all columns that are either for a particular city, or that are for rainfall anywhere:
```jldoctest symbol_searching
julia> const LON_or_rainfall_cols = filter(col -> startswith(col, :LON) || endswith(col, :rainfall), column_names)
5-element Array{Symbol,1}:
 :NY_rainfall
 :LON_temperature
 :LON_house_price
 :LON_car_price
 :LON_rainfall
```
