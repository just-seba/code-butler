using System;
using System.CommandLine;
using System.CommandLine.Parsing;
using System.IO;
using System.Threading.Tasks;

namespace CodeButler;

public class Program
{
    public static async Task<int> Main(string[] args)
    {
        var rootCommand = new RootCommand("Reorganises, sorts and cleans up the provided C# file.");

        var noSortMembersByAlphabetOption = new Option<bool>(
            name: "--no-sort-members-by-alphabet",
            description: "Disables sorting members by alphabet.",
            getDefaultValue: () => false
        );

        var inputFileArgMeta = new
        {
            Name = "input",
            Description = "Path to input file or piped input."
        };

        var inputFileArg = new Argument<FileInfo?>(
            name: "input",
            description: "Path to input file or piped input.",
            isDefault: true,
            parse: result =>
            {
                if (result.Tokens.Count != 0)
                {
                    var fileInfo = new FileInfo(result.Tokens[0].Value);
                    if (!fileInfo.Exists)
                    {
                        result.ErrorMessage = $"File {fileInfo} does not exist.";
                    }

                    return fileInfo;
                }
                else if (Console.IsInputRedirected)
                {
                    return null;
                }
                else
                {
                    result.ErrorMessage = "Missing file path or piped input.";
                    return null;
                }
            }
        );

        rootCommand.AddOption(noSortMembersByAlphabetOption);
        rootCommand.AddArgument(inputFileArg);

        rootCommand.SetHandler(
            RootCommandHandler.Handle,
            new RootCommandConfigurationBinder(noSortMembersByAlphabetOption, inputFileArg)
        );

        var exitCode = await rootCommand.InvokeAsync(args);
        return exitCode;
    }
}
