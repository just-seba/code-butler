using System.CommandLine;
using System.CommandLine.Binding;
using System.IO;

namespace CodeButler;

public class RootCommandConfigurationBinder : BinderBase<RootCommandConfiguration>
{
    private readonly Option<bool> _noSortMembersByAlphabet;
    private readonly Argument<FileInfo?> _file;

    public RootCommandConfigurationBinder(
        Option<bool> noSortMembersByAlphabet,
        Argument<FileInfo?> file
    )
    {
        _noSortMembersByAlphabet = noSortMembersByAlphabet;
        _file = file;
    }

    protected override RootCommandConfiguration GetBoundValue(BindingContext bindingContext)
    {
        var parseResult = bindingContext.ParseResult;

        var file = parseResult.GetValueForArgument(_file);
        var mode = file is null ? InputOutputMode.Console : InputOutputMode.File;

        return new RootCommandConfiguration
        {
            SortMembersByAlphabet = !bindingContext.ParseResult.GetValueForOption(
                _noSortMembersByAlphabet
            ),
            Mode = mode,
            File = file,
            Console = bindingContext.Console,
        };
    }
}
