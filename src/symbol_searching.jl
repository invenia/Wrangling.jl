# `contains` was added to Julia Base in 1.5.0-DEV.639
# https://github.com/JuliaLang/julia/commit/cc6e121386758dff6ba7911770e48dfd59520199
@static if VERSION <= v"1.5.0-DEV.639"
    """
        contains(haystack, needle)

    This is the same as `Base.occurin(needle, haystack)`, just with the arguments reversed.
    This makes it line up with `startswith` and `endswith`.
    """
    contains(haystack, needle) = occursin(needle, haystack)
end

for (mod, f) in ((Base, :startswith), (Base, :endswith), (Wrangling, :contains))
    # add Symbol overloads
    @eval $mod.$f(haystack::Symbol, needle::Symbol) = $f(String(haystack), String(needle))
    @eval $mod.$f(haystack::Symbol, needle) = $f(String(haystack), needle)
    if f === :contains
        # `AbstractString` constraint needed to avoid ambiguities with Base in v1.5+.
        @eval $mod.$f(haystack::AbstractString, needle::Symbol) = $f(haystack, String(needle))
    else
        @eval $mod.$f(haystack, needle::Symbol) = $f(haystack, String(needle))
    end

    # add _any varients
    @eval begin
        """
            $($f)_any(haystack, needles)

        Given a list of `needles`, this returns `true`
        if `$($f)` would return true for any needle in that list.
        """
        function $(Symbol(f, :_any))(haystack, needles)
            return any($f(haystack, needle) for needle in needles)
        end
    end
end

# add curried varients
for (needle_var, fs) in (
    :needle => (:(Base.startswith), :(Base.endswith), :contains),
    :needles => (:startswith_any, :endswith_any, :contains_any),
)
    for f in fs
        quote_nv = QuoteNode(needle_var)
        @eval begin
            """
                $($f)($($quote_nv)) -> Function
            Curried form of `$($f)(haystack, $($quote_nv))`
            """
            $f($needle_var) = Base.Fix2($f, $needle_var)
        end
    end
end
