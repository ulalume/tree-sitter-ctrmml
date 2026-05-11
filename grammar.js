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

    // Meta commands. The grammar discriminates a handful of keywords
    // whose values carry meaning (#platform, #option, #group, #timesig)
    // from the generic catch-all so highlights.scm can colour them
    // differently — this mirrors the rules in
    // `web-ctrmml/src/editor/mml-monarch.ts`. Each specific variant
    // still falls back to `meta_value` when the value doesn't match
    // a known keyword (e.g. `#timesig garbage`).
    meta_command: ($) =>
      choice(
        $.platform_meta,
        $.option_meta,
        $.group_meta,
        $.timesig_meta,
        $.generic_meta,
      ),

    platform_meta: ($) =>
      seq(
        field("keyword", $.platform_meta_keyword),
        optional(field("value", choice($.platform_known_value, $.meta_value))),
      ),
    platform_meta_keyword: ($) => token(prec(2, "#platform")),
    platform_known_value: ($) => token(/\s+(?:megadrive|mdsdrv)[^\n]*/),

    option_meta: ($) =>
      seq(
        field("keyword", $.option_meta_keyword),
        optional(field("value", choice($.option_known_value, $.meta_value))),
      ),
    option_meta_keyword: ($) => token(prec(2, "#option")),
    option_known_value: ($) => token(/\s+noextpitch[^\n]*/),

    group_meta: ($) =>
      seq(
        field("keyword", $.group_meta_keyword),
        optional(field("value", choice($.group_known_value, $.meta_value))),
      ),
    group_meta_keyword: ($) => token(prec(2, "#group")),
    group_known_value: ($) => token(/\s+(?:bgm|se)[^\n]*/),

    timesig_meta: ($) =>
      seq(
        field("keyword", $.timesig_meta_keyword),
        optional(field("value", choice($.timesig_known_value, $.meta_value))),
      ),
    timesig_meta_keyword: ($) => token(prec(2, "#timesig")),
    timesig_known_value: ($) => token(/\s+(?:\d+\s*\/\s*\d+|no)[^\n]*/),

    generic_meta: ($) =>
      seq(
        field("keyword", $.meta_keyword),
        optional(field("value", $.meta_value)),
      ),
    meta_keyword: ($) =>
      token(
        /#(?:title|composer|author|date|comment|game|composerj|programmer|include|pcmpath|[A-Za-z][A-Za-z0-9_-]*)/,
      ),
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
    platform_command_keyword: ($) => token(/[A-Za-z][A-Za-z0-9_-]*/),

    number: ($) => token(/[+-]?\d+(?:\.\d+)?/),
    string: ($) => token(/"(?:[^"\\]|\\.)*"/),

    track_selector: ($) => token(/(?:\*[0-9]+|[A-Z]+)/),

    operator: ($) => token(/[+\-*\/=<>:()]/),
    punctuation: ($) => token(/[\[\]\{\}\|.,]/),
    param_key: ($) => token(/(?:rate|offset)/),

    comment: ($) => token(/;[^\n]*/),
  },
});
