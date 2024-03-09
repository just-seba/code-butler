﻿using System.CommandLine;
using System.IO;

namespace CodeButler;

public class RootCommandConfiguration
{
    public bool SortMembersByAlphabet { get; init; }
    public InputOutputMode Mode { get; init; }
    public FileInfo? File { get; init; }
    public IConsole Console { get; init; } = null!;
}
