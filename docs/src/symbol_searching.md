# Working with Symbols

Tables use `Symbol`s to represent column names.
Often one thus wants to do various filters on `Symbol`s.

Most filtering functions only accept strings, so code contains a lot of code like:
```julia
filter(col_name->startswith(colname, "tempurature"), Symbol.(names(df)))
```

We solve that by making functions that accept `Symbol` for all the arguments that would otherwise be strings.
Similarly, while some functions like `isequal` and `in` have _curried_ varients, like `in(collection)` being the same as `item->in(item, collection)`,
not all do.
We add the missing ones.


!!! warning Type Piracy
    We type-pirate `startwith` and `endswith` to provide the single argument, and `Symbol` accepting versions.
    This is misdemeanor type-piracy: it only turns code which currently errors into nonerrors.
    Its also the only reasonable definition for these types.
    We don't type-pirate `occursin` as we replace that with `` which follows the consistent argument order.


### Functions:
These are basically all varients of existing functions.

 [`contains`](@ref)`(haystack, needle)` is an argument order reversed version of `occursin(needle, haystack)`. It matchs `startswith` and `endswith`.

`contains`, `startswith`, `endswith`, and all their varients mentioned here, all accept symbols everywhere they might accept `String`s.

The curried varients are `check(needle) == haystack->check(haystack, needle)`.
We have them for `contains`, `startswith`, `endswith`, and all their varients.

They any varients are `startswith_any`, `endswith_any`,  and `contains_any`.
They are of the form:
```julia
check_any(needles, haystack) == any(check(haystack, needle) for needle in needles)
```

## Examples

Consider if I had a list of column names, to do with house prices and weather in various cities.
Where want city it is about is part of the column name, as what kind of data it is.

I might want just the columns names that are for a particular city:
```jldoctest symbol_searching
julia> using Wrangling

julia> const column_names = [:NY_temperature, :NY_house_price, :NY_rainfall, :LON_temperature, :LON_house_price, :LON_rainfall];

julia> const LON_cols = filter(startswith(:LON), column_names)
3-element Array{Symbol,1}:
 :LON_temperature
 :LON_house_price
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
2-element Array{Symbol,1}:
 :NY_house_price
 :LON_house_price
```
