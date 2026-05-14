(comment) @comment
((platform_command_keyword) @keyword
  (#set! "priority" 110))
(string) @string
(number) @number

; Meta keyword names (`#title`, `#platform`, ...) — every variant.
; They all share the @preproc colour so the visual treatment stays
; consistent regardless of which sub-rule matched.
(meta_keyword) @preproc
(platform_meta_keyword) @preproc
(option_meta_keyword) @preproc
(group_meta_keyword) @preproc
(timesig_meta_keyword) @preproc

; Meta value classes:
;   - "known" values (the meaningful keywords for each meta type) get
;     @keyword so they pop visually next to the @preproc keyword.
;   - The free-form `meta_value` fallback gets @string for everything
;     else (song titles, composer names, arbitrary comments, etc.).
(platform_known_value) @keyword
(option_known_value) @keyword
(group_known_value) @keyword
(timesig_known_value) @keyword
(meta_value) @string

(at_command) @function
(track_selector) @title

(instrument_type) @type
(note) @constant
(rest) @constant

(command_with_number) @keyword
(command) @keyword
(escape_command) @keyword
(key_signature) @keyword

(operator) @operator
(punctuation) @punctuation.delimiter
(param_key) @property
