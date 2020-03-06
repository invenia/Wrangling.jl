# Performs tests on a checker considering a bunch of different transforms of the
# needle and haystack
function test_checker(
    check::Function,
    haystack::AbstractString,
    right_needle,
    wrong_needle,
)

    @testset "$check" begin
        for (haystack_f, needle_f) in haystack_needle_transforms
            test_checker1(
                check,
                transform(haystack_f, haystack),
                transform(needle_f, right_needle),
                transform(needle_f, wrong_needle),
            )
        end
    end
end

const haystack_needle_transforms = Iterators.product(
    (identity, Symbol),  # haystack
    (identity, Symbol, first, Regex),  # needle
)

transform(f, x) = f(x)
transform(f, x::Tuple) = map(f, x)  # for testing _any varients

function test_checker1(
    check::Function, haystack::H, right_needle::N, wrong_needle::N
) where {H,N}
    @testset "$H, $N" begin
        @testset "2 arg form" begin
            @test check(haystack, right_needle)
            @test !check(haystack, wrong_needle)
        end

        @testset "curried form" begin
            @test check(right_needle)(haystack)
            @test !check(wrong_needle)(haystack)

            @test (!check(wrong_needle))(haystack)  # check negated function
        end
    end
end

@testset "symbol_searching.jl" begin
    @testset "basic varients" begin
        test_checker(contains, "abc", "b", "x")
        test_checker(startswith, "abc", "a", "b")
        test_checker(endswith, "abc", "c", "b")
    end

    @testset "_any varients" begin
        @testset "singleton tuple" begin
            test_checker(contains_any, "abc", ("b",), ("x",))
            test_checker(startswith_any, "abc", ("a",), ("b",))
            test_checker(endswith_any, "abc", ("c",), ("b",))
        end

        @testset "right || wrong == right and wrong || wrong ==wrong" begin
            test_checker(contains_any, "abc", ("b", "q"), ("x", "q"))
            test_checker(startswith_any, "abc", ("a", "q"), ("b", "q"))
            test_checker(endswith_any, "abc", ("c", "q"), ("b", "q"))
        end
    end
end
