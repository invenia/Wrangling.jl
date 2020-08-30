for (mod, f) in ((Base, :startswith), (Base, :endswith), (Compat, :contains))
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
for f in (:startswith_any, :endswith_any, :contains_any)
    @eval begin
        """
            $($f)(needles) -> Function

        Curried form of `$($f)(haystack, needles)`
        """
        $f(needles) = Base.Fix2($f, needles)
    end
end
