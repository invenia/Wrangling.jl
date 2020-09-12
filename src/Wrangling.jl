module Wrangling

using Compat: Compat, contains

export contains
export startswith_any, endswith_any, contains_any

include("symbol_searching.jl")

end # module
