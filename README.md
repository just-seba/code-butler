# Code Butler

[Code Butler](https://github.com/just-seba/code-butler) is a [dotnet tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools) and [VS code extension](https://marketplace.visualstudio.com/items?itemName=projektanker.code-butler) for your `C#` files at your service.  
This tool is heavily inspired by [CodeMaid](https://www.codemaid.net). As it is available as as a stand-alone version and as a Visual Studio Code extension, this tool will provide similar features.

## Features

Using this tool will cleanup your `C#` file by

1.  reorganizing the layout of the members in the C# file to follow Microsoft's StyleCop conventions
2.  sorting it's using directives
3.  removes trailing whitespace and consecutive blank lines
4.  (only in [VS code extension](https://marketplace.visualstudio.com/items?itemName=projektanker.code-butler)) executing `Format Document` command.

as described below.

### VS code extension

- Run code cleanup on save (disabled by default)

### Reorganize the layout of members in a C# file to follow Microsoft's StyleCop conventions

First by type:

1. Field
2. Constructor
3. Destructor
4. Delegate
5. Event
6. Enum
7. Interface
8. Property
9. Indexer
10. Operator
11. Method
12. Struct
13. Class

Then by access modifier:

1.  `public`
2.  `internal`
3.  `protected`
4.  `protected internal`
5.  `private protected`
6.  `private`

Then by additional modifiers:

1.  `const`
2.  `static readonly`
3.  `static`
4.  `readonly`
5.  none

And finally alphabetically.

**Warning:** `#region ... #endregion` is not supported.

### Sort using directives

Sorts using directives alphabetically while placing `System` directives first and taking into account the following order:

1. "Normal" using directives
2. Aliased using statements (e.g. `using MyAlias = Example.Bar`)
3. Static using statements (e.g. `using static System.Math`)

Example:

```csharp
using System;
using Example;
using Example.Foo;
using MyAlias = Example.Bar;
using static System.Math;
```

### Removes trailing whitespace and consecutive blank lines

- Removes trailing whitespace.
- Removes consecutive blank lines.

## Prerequisites

- [.NET 8 runtime](https://dotnet.microsoft.com/download/dotnet/8.0)

## Usage

### Visual Studio Code Extension

Execute command `Code Butler: Cleanup C# file` while editing a `C#` file to clean it up.

### dotnet tool:

Install Code Butler as a global tool with the following command.

```sh
dotnet tool install --global code-butler
```

Then use the tool to cleanup your code.

```sh
# File mode
dotnet-code-butler path/to/MyClass.cs

# Pipe mode
type path/to/MyClass.cs | dotnet-code-butler > MyClass.Reorganized.cs`
```

## Contributors

- [Projektanker GmbH](https://github.com/Projektanker/)
- [loreggia](https://github.com/loreggia)
- [pmahend1](https://github.com/pmahend1)
