Aggrenda iWidget
================

Renders Aggrenda widgets as images.

This is intended to be used in `<img>` elements in environments where iframes aren't supported.


## Usage

```html
<a href="http://aggrenda.com/:username/:calendar/" title="Click for details" target="_blank">
  ![Startup Events](http://iwidgets.aggrenda.com/:username/:calendar/:view/embed/)
</a>
```

#### Parameters

- `:username` your username
- `:calendar` the calendar you'd like to show
- `:view` is either `monthly`, `list`, or `next-event`

#### Available URL arguments

- `width` the width to render to
- `min-height` the minimum height of the resulting image
- `footer` whether to show the footer from the widget
- `separator` whether to show a separator between the calendar and the footer
- `source` whether to show the name of the source calendar in the footer
- `promotion` whether to show Aggrenda in the footer
- `empty-message` the message to display when there are no events to display


## Examples

### Monthly calendar

<a href="http://aggrenda.com/aggrenda-pgh/startup-events/monthly/" title="Click for details" target="_blank">
  ![Startup Events](http://iwidgets.aggrenda.com/aggrenda-pgh/startup-events/monthly/embed/?width=852)
</a>

### Your next event

<a href="http://aggrenda.com/aggrenda-pgh/startup-events/list/" title="Click for details" target="_blank">
  ![Startup Events - Next Event](http://iwidgets.aggrenda.com/aggrenda-pgh/startup-events/next-event/embed/?width=852)
</a>

### List of events

<a href="http://aggrenda.com/aggrenda-pgh/startup-events/" title="Click for details" target="_blank">
  ![Startup Events List](http://iwidgets.aggrenda.com/aggrenda-pgh/startup-events/list/embed/?width=852)
</a>


[http://iwidgets.aggrenda.com](http://iwidgets.aggrenda.com)
