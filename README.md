Aggrenda iWidget Server
=======================

Renders Aggrenda widgets as images.

This is intended to be used in `<img>` elements,
especially in environments where `<iframe>` isn't supported.

[http://iwidgets.aggrenda.com](http://iwidgets.aggrenda.com)


## Usage

```html
<a href="http://aggrenda.com/:username/:calendar/" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/:username/:calendar/:view/embed/" alt="Events" />
</a>
```

Note the trailing `/embed/`. This is required.

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

```html
<a href="http://aggrenda.com/aggrenda-pgh/technology-events/monthly/" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/monthly/embed/" alt="Technology Events" />
</a>
```

<a href="http://aggrenda.com/aggrenda-pgh/technology-events/monthly/" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/monthly/embed/?width=852" alt="Technology Events" />
</a>


### Your next event

```html
<a href="http://aggrenda.com/aggrenda-pgh/technology-events/" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/monthly/next-event/embed/" alt="Next Up" />
</a>
```

<a href="http://aggrenda.com/aggrenda-pgh/technology-events/" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/next-event/embed/?width=852" alt="Next Up" />
</a>


### Upcoming events

```html
<a href="http://aggrenda.com/aggrenda-pgh/technology-events/" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/list/embed/" alt="Upcoming Events" />
</a>
```

<a href="http://aggrenda.com/aggrenda-pgh/technology-events/" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/list/embed/?width=852&amp;page-size=5" alt="Upcoming Events" />
</a>


### Past three events

```html
<a href="http://aggrenda.com/aggrenda-pgh/technology-events/?past" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/list/embed/?past&page-size=3" alt="Past" />
</a>
```

<a href="http://aggrenda.com/aggrenda-pgh/technology-events/?past" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/aggrenda-pgh/technology-events/list/embed/?width=852&amp;past&&amp;page-size=3" alt="Past" />
</a>
