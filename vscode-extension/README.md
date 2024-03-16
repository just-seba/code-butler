# Code Butler for Visual Studio Code

This extension makes use of the dotnet tool [code-butler](https://www.nuget.org/packages/code-butler) to clean up you `C#` files.

This tool is heavily inspired by [CodeMaid](https://www.codemaid.net). As it is available as as a [dotnet tool](https://www.nuget.org/packages/code-butler) and [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=just-seba.vscode-code-butler), this tool will provide similar features.

## Features

Using this tool will cleanup your `C#` file by

1.  reorganizing the layout of the members in the C# file to follow Microsoft's StyleCop conventions
2.  sorting it's using directives
3.  removes trailing whitespace and consecutive blank lines
4.  Executing the `Format Document` command.

as described below.

### Settings

- Run code cleanup on save (disabled by default)
- Sort members by alphabet (enabled by default)

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

And finally alphabetically (optional).

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

- [code-butler](https://www.nuget.org/packages/code-butler) installed as [global dotnet tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools-how-to-use).

## Usage

Execute command `Code Butler: Cleanup C# file` while editing a `C#` file to clean it up.
