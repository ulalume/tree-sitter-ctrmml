module.exports = grammar({
  name: "ctrmml",

  extras: ($) => [/\s/, $.comment],

  rules: {
    source_file: ($) => repeat($._item),

    _item: ($) =>
      choice(
        $.meta_command,
        $.at_command,
        $.instrument_type,
        $.note,
        $.rest,
        $.command_with_number,
        $.command,
        $.escape_command,
        $.platform_command,
        $.number,
        $.string,
        $.track_selector,
        $.operator,
        $.punctuation,
        $.param_key,
      ),

    meta_command: ($) =>
      seq(
        $.meta_keyword,
        optional(choice($.meta_platform_value, $.meta_value)),
      ),
    meta_keyword: ($) =>
      token(
        /#(?:title|composer|author|date|comment|platform|option|game|composerj|programmer|[A-Za-z][A-Za-z0-9_-]*)/,
      ),
    meta_platform_value: ($) => token(/\s+(?:megadrive|mdsdrv)[^\n]*/),
    meta_value: ($) => token(/\s+[^\n]*/),
    at_command: ($) => token(/@(?:[A-Za-z]\d+|\d+)/),

    instrument_type: ($) => token(/(?:fm|psg|pcm|2op)/),
    note: ($) => token(/(?:[a-gh](?:[+\-=])?)+/),
    rest: ($) => token(/r/),

    command_with_number: ($) =>
      token(/(?:o|l|q|Q|C|R|s|t|T|v|V|p|k|K|E|M|P|G|D|_+)[+-]?\d+(?:\.\d+)?/),
    command: ($) => token(/(?:o|l|q|s|t|v|p|k|__|_|\^|&)/),
    escape_command: ($) => token(/\\=?/),

    platform_command: ($) =>
      seq(
        "'",
        field("keyword", $.platform_command_keyword),
        optional(field("args", token(/[^']+/))),
        "'",
      ),
    platform_command_keyword: ($) =>
      token(/(?:fm3|lfo|lforate|mode|pcmmode|pcmrate|write|tl[1-4])/),

    number: ($) => token(/[+-]?\d+(?:\.\d+)?/),
    string: ($) => token(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/),

    track_selector: ($) => token(/(?:\*[0-9]+|[A-Z]+)/),

    operator: ($) => token(/[+\-*\/=<>:()]/),
    punctuation: ($) => token(/[\[\]\{\}\|.,]/),
    param_key: ($) => token(/(?:rate|offset)/),

    comment: ($) => token(/;[^\n]*/),
  },
});
