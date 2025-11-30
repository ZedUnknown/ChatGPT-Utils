[<img align="center" alt="banner" src="https://github.com/DaveUnknown/image-library/blob/main/ChatGPT-Utils/banner.png">](#)

[<a target="_blank" href="https://polyformproject.org/licenses/noncommercial/1.0.0/"><img align="right" alt="banner" src="https://img.shields.io/badge/PolyForm_Noncommercial-PolyForm_Noncommercial?style=flat&label=License%20&labelColor=242526&color=ff1423&link=https%3A%2F%2Fgithub.com%2FZedUnknown%2FChatGPT-Utils%2Fedit%2Fmain%2FREADME.md%23license"></a>](#)

# ChatGPT Utils - Browser Extension

**ChatGPT Utils** is a lightweight and modular browser extension designed to enhance your experience on ChatGPT Web.

#### Chrome Webstore Details

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/jblbnhicpaildkkbfojidfckanofaaen?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIHdpZHRoPSIxOTIiPjxwYXRoIGQ9Ik0wIDBoMTkydjE5MkgweiIgZmlsbD0ibm9uZSIvPjxkZWZzPjxwYXRoIGQ9Ik04IDIwdjE0MGMwIDYuNiA1LjQgMTIgMTIgMTJoMTUyYzYuNiAwIDEyLTUuNCAxMi0xMlYyMEg4em0xMDggMzJINzZjLTQuNDIgMC04LTMuNTgtOC04czMuNTgtOCA4LThoNDBjNC40MiAwIDggMy41OCA4IDhzLTMuNTggOC04IDh6IiBpZD0iYSIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjx1c2Ugb3ZlcmZsb3c9InZpc2libGUiIHhsaW5rOmhyZWY9IiNhIi8%2BPC9jbGlwUGF0aD48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGQ9Ik04IDIwaDE3NnYxNTJIOHoiIGZpbGw9IiNlZWUiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGQ9Ik0xMTYgMzZINzZjLTQuNDIgMC04IDMuNTgtOCA4czMuNTggOCA4IDhoNDBjNC40MiAwIDgtMy41OCA4LThzLTMuNTgtOC04LTh6IiBmaWxsPSIjZmZmIi8%2BPGcgY2xpcC1wYXRoPSJ1cmwoI2IpIj48ZGVmcz48Y2lyY2xlIGN4PSI5NiIgY3k9IjE2MCIgaWQ9ImMiIHI9Ijc2Ii8%2BPC9kZWZzPjxjbGlwUGF0aCBpZD0iZCI%2BPHVzZSBvdmVyZmxvdz0idmlzaWJsZSIgeGxpbms6aHJlZj0iI2MiLz48L2NsaXBQYXRoPjxwYXRoIGNsaXAtcGF0aD0idXJsKCNkKSIgZD0iTTMyLjA3IDg0djkzLjI3aDM0LjAxTDk2IDEyNS40NWg3NlY4NHptMCAwdjkzLjI3aDM0LjAxTDk2IDEyNS40NWg3NlY4NHoiIGZpbGw9IiNEQjQ0MzciLz48cGF0aCBjbGlwLXBhdGg9InVybCgjZCkiIGQ9Ik0yMCAyMzZoNzIuMzRsMzMuNTgtMzMuNTh2LTI1LjE0bC01OS44NC0uMDFMMjAgOTguMjR6bTAgMGg3Mi4zNGwzMy41OC0zMy41OHYtMjUuMTRsLTU5Ljg0LS4wMUwyMCA5OC4yNHoiIGZpbGw9IiMwRjlENTgiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjZCkiIGQ9Ik05NiAxMjUuNDVsMjkuOTIgNTEuODJMOTIuMzUgMjM2SDE3MlYxMjUuNDV6bTAgMGwyOS45MiA1MS44Mkw5Mi4zNSAyMzZIMTcyVjEyNS40NXoiIGZpbGw9IiNGRkNENDAiLz48ZyBjbGlwLXBhdGg9InVybCgjZCkiPjxjaXJjbGUgY3g9Ijk2IiBjeT0iMTYwIiBmaWxsPSIjRjFGMUYxIiByPSIzNC41NSIvPjxjaXJjbGUgY3g9Ijk2IiBjeT0iMTYwIiBmaWxsPSIjNDI4NUY0IiByPSIyNy42NCIvPjwvZz48L2c%2BPHBhdGggY2xpcC1wYXRoPSJ1cmwoI2IpIiBkPSJNOCAyMGgxNzZ2NzZIOHoiIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8%2BPHBhdGggZD0iTTggOTVoMTc2djFIOHoiIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iLjAyIi8%2BPHBhdGggZD0iTTggOTZoMTc2djFIOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8%2BPHBhdGggZD0iTTExNiA1Mkg3NmMtNC4yNSAwLTcuNzItMy4zMi03Ljk3LTcuNS0uMDIuMTctLjAzLjMzLS4wMy41IDAgNC40MiAzLjU4IDggOCA4aDQwYzQuNDIgMCA4LTMuNTggOC04IDAtLjE3LS4wMS0uMzMtLjAzLS41LS4yNSA0LjE4LTMuNzIgNy41LTcuOTcgNy41ek04IDIwdjFoMTc2di0xSDh6IiBmaWxsPSIjMjEyMTIxIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjxwYXRoIGQ9Ik03NiAzNmg0MGM0LjI1IDAgNy43MiAzLjMyIDcuOTcgNy41LjAxLS4xNy4wMy0uMzMuMDMtLjUgMC00LjQyLTMuNTgtOC04LThINzZjLTQuNDIgMC04IDMuNTgtOCA4IDAgLjE3LjAxLjMzLjAzLjUuMjUtNC4xOCAzLjcyLTcuNSA3Ljk3LTcuNXptOTYgMTM1SDIwYy02LjYgMC0xMi01LjQtMTItMTJ2MWMwIDYuNiA1LjQgMTIgMTIgMTJoMTUyYzYuNiAwIDEyLTUuNCAxMi0xMnYtMWMwIDYuNi01LjQgMTItMTIgMTJ6IiBmaWxsPSIjMjMxRjIwIiBmaWxsLW9wYWNpdHk9Ii4xIi8%2BPHJhZGlhbEdyYWRpZW50IGN4PSI3LjUwMiIgY3k9IjE5LjM0NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJlIiByPSIyMjcuNTk2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ%2BPHBhdGggZD0iTTggMjB2MTQwYzAgNi42IDUuNCAxMiAxMiAxMmgxNTJjNi42IDAgMTItNS40IDEyLTEyVjIwSDh6bTEwOCAzMkg3NmMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOGg0MGM0LjQyIDAgOCAzLjU4IDggOHMtMy41OCA4LTggOHoiIGZpbGw9InVybCgjZSkiLz48L3N2Zz4%3D&label=version&labelColor=ffffff&color=ffdf00&link=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fchatgpt-utils%2Fjblbnhicpaildkkbfojidfckanofaaen%3Fauthuser%3D3%26hl%3Den)](https://chromewebstore.google.com/detail/jblbnhicpaildkkbfojidfckanofaaen?utm_source=item-share-cb)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/jblbnhicpaildkkbfojidfckanofaaen?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIHdpZHRoPSIxOTIiPjxwYXRoIGQ9Ik0wIDBoMTkydjE5MkgweiIgZmlsbD0ibm9uZSIvPjxkZWZzPjxwYXRoIGQ9Ik04IDIwdjE0MGMwIDYuNiA1LjQgMTIgMTIgMTJoMTUyYzYuNiAwIDEyLTUuNCAxMi0xMlYyMEg4em0xMDggMzJINzZjLTQuNDIgMC04LTMuNTgtOC04czMuNTgtOCA4LThoNDBjNC40MiAwIDggMy41OCA4IDhzLTMuNTggOC04IDh6IiBpZD0iYSIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjx1c2Ugb3ZlcmZsb3c9InZpc2libGUiIHhsaW5rOmhyZWY9IiNhIi8%2BPC9jbGlwUGF0aD48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGQ9Ik04IDIwaDE3NnYxNTJIOHoiIGZpbGw9IiNlZWUiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGQ9Ik0xMTYgMzZINzZjLTQuNDIgMC04IDMuNTgtOCA4czMuNTggOCA4IDhoNDBjNC40MiAwIDgtMy41OCA4LThzLTMuNTgtOC04LTh6IiBmaWxsPSIjZmZmIi8%2BPGcgY2xpcC1wYXRoPSJ1cmwoI2IpIj48ZGVmcz48Y2lyY2xlIGN4PSI5NiIgY3k9IjE2MCIgaWQ9ImMiIHI9Ijc2Ii8%2BPC9kZWZzPjxjbGlwUGF0aCBpZD0iZCI%2BPHVzZSBvdmVyZmxvdz0idmlzaWJsZSIgeGxpbms6aHJlZj0iI2MiLz48L2NsaXBQYXRoPjxwYXRoIGNsaXAtcGF0aD0idXJsKCNkKSIgZD0iTTMyLjA3IDg0djkzLjI3aDM0LjAxTDk2IDEyNS40NWg3NlY4NHptMCAwdjkzLjI3aDM0LjAxTDk2IDEyNS40NWg3NlY4NHoiIGZpbGw9IiNEQjQ0MzciLz48cGF0aCBjbGlwLXBhdGg9InVybCgjZCkiIGQ9Ik0yMCAyMzZoNzIuMzRsMzMuNTgtMzMuNTh2LTI1LjE0bC01OS44NC0uMDFMMjAgOTguMjR6bTAgMGg3Mi4zNGwzMy41OC0zMy41OHYtMjUuMTRsLTU5Ljg0LS4wMUwyMCA5OC4yNHoiIGZpbGw9IiMwRjlENTgiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjZCkiIGQ9Ik05NiAxMjUuNDVsMjkuOTIgNTEuODJMOTIuMzUgMjM2SDE3MlYxMjUuNDV6bTAgMGwyOS45MiA1MS44Mkw5Mi4zNSAyMzZIMTcyVjEyNS40NXoiIGZpbGw9IiNGRkNENDAiLz48ZyBjbGlwLXBhdGg9InVybCgjZCkiPjxjaXJjbGUgY3g9Ijk2IiBjeT0iMTYwIiBmaWxsPSIjRjFGMUYxIiByPSIzNC41NSIvPjxjaXJjbGUgY3g9Ijk2IiBjeT0iMTYwIiBmaWxsPSIjNDI4NUY0IiByPSIyNy42NCIvPjwvZz48L2c%2BPHBhdGggY2xpcC1wYXRoPSJ1cmwoI2IpIiBkPSJNOCAyMGgxNzZ2NzZIOHoiIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8%2BPHBhdGggZD0iTTggOTVoMTc2djFIOHoiIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iLjAyIi8%2BPHBhdGggZD0iTTggOTZoMTc2djFIOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8%2BPHBhdGggZD0iTTExNiA1Mkg3NmMtNC4yNSAwLTcuNzItMy4zMi03Ljk3LTcuNS0uMDIuMTctLjAzLjMzLS4wMy41IDAgNC40MiAzLjU4IDggOCA4aDQwYzQuNDIgMCA4LTMuNTggOC04IDAtLjE3LS4wMS0uMzMtLjAzLS41LS4yNSA0LjE4LTMuNzIgNy41LTcuOTcgNy41ek04IDIwdjFoMTc2di0xSDh6IiBmaWxsPSIjMjEyMTIxIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjxwYXRoIGQ9Ik03NiAzNmg0MGM0LjI1IDAgNy43MiAzLjMyIDcuOTcgNy41LjAxLS4xNy4wMy0uMzMuMDMtLjUgMC00LjQyLTMuNTgtOC04LThINzZjLTQuNDIgMC04IDMuNTgtOCA4IDAgLjE3LjAxLjMzLjAzLjUuMjUtNC4xOCAzLjcyLTcuNSA3Ljk3LTcuNXptOTYgMTM1SDIwYy02LjYgMC0xMi01LjQtMTItMTJ2MWMwIDYuNiA1LjQgMTIgMTIgMTJoMTUyYzYuNiAwIDEyLTUuNCAxMi0xMnYtMWMwIDYuNi01LjQgMTItMTIgMTJ6IiBmaWxsPSIjMjMxRjIwIiBmaWxsLW9wYWNpdHk9Ii4xIi8%2BPHJhZGlhbEdyYWRpZW50IGN4PSI3LjUwMiIgY3k9IjE5LjM0NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJlIiByPSIyMjcuNTk2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ%2BPHBhdGggZD0iTTggMjB2MTQwYzAgNi42IDUuNCAxMiAxMiAxMmgxNTJjNi42IDAgMTItNS40IDEyLTEyVjIwSDh6bTEwOCAzMkg3NmMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOGg0MGM0LjQyIDAgOCAzLjU4IDggOHMtMy41OCA4LTggOHoiIGZpbGw9InVybCgjZSkiLz48L3N2Zz4%3D&label=ratings&labelColor=ffffff&color=ffdf00&link=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fchatgpt-utils%2Fjblbnhicpaildkkbfojidfckanofaaen%3Fauthuser%3D3%26hl%3Den)](https://chromewebstore.google.com/detail/jblbnhicpaildkkbfojidfckanofaaen?utm_source=item-share-cb)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/size/jblbnhicpaildkkbfojidfckanofaaen?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIHdpZHRoPSIxOTIiPjxwYXRoIGQ9Ik0wIDBoMTkydjE5MkgweiIgZmlsbD0ibm9uZSIvPjxkZWZzPjxwYXRoIGQ9Ik04IDIwdjE0MGMwIDYuNiA1LjQgMTIgMTIgMTJoMTUyYzYuNiAwIDEyLTUuNCAxMi0xMlYyMEg4em0xMDggMzJINzZjLTQuNDIgMC04LTMuNTgtOC04czMuNTgtOCA4LThoNDBjNC40MiAwIDggMy41OCA4IDhzLTMuNTggOC04IDh6IiBpZD0iYSIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjx1c2Ugb3ZlcmZsb3c9InZpc2libGUiIHhsaW5rOmhyZWY9IiNhIi8%2BPC9jbGlwUGF0aD48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGQ9Ik04IDIwaDE3NnYxNTJIOHoiIGZpbGw9IiNlZWUiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGQ9Ik0xMTYgMzZINzZjLTQuNDIgMC04IDMuNTgtOCA4czMuNTggOCA4IDhoNDBjNC40MiAwIDgtMy41OCA4LThzLTMuNTgtOC04LTh6IiBmaWxsPSIjZmZmIi8%2BPGcgY2xpcC1wYXRoPSJ1cmwoI2IpIj48ZGVmcz48Y2lyY2xlIGN4PSI5NiIgY3k9IjE2MCIgaWQ9ImMiIHI9Ijc2Ii8%2BPC9kZWZzPjxjbGlwUGF0aCBpZD0iZCI%2BPHVzZSBvdmVyZmxvdz0idmlzaWJsZSIgeGxpbms6aHJlZj0iI2MiLz48L2NsaXBQYXRoPjxwYXRoIGNsaXAtcGF0aD0idXJsKCNkKSIgZD0iTTMyLjA3IDg0djkzLjI3aDM0LjAxTDk2IDEyNS40NWg3NlY4NHptMCAwdjkzLjI3aDM0LjAxTDk2IDEyNS40NWg3NlY4NHoiIGZpbGw9IiNEQjQ0MzciLz48cGF0aCBjbGlwLXBhdGg9InVybCgjZCkiIGQ9Ik0yMCAyMzZoNzIuMzRsMzMuNTgtMzMuNTh2LTI1LjE0bC01OS44NC0uMDFMMjAgOTguMjR6bTAgMGg3Mi4zNGwzMy41OC0zMy41OHYtMjUuMTRsLTU5Ljg0LS4wMUwyMCA5OC4yNHoiIGZpbGw9IiMwRjlENTgiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjZCkiIGQ9Ik05NiAxMjUuNDVsMjkuOTIgNTEuODJMOTIuMzUgMjM2SDE3MlYxMjUuNDV6bTAgMGwyOS45MiA1MS44Mkw5Mi4zNSAyMzZIMTcyVjEyNS40NXoiIGZpbGw9IiNGRkNENDAiLz48ZyBjbGlwLXBhdGg9InVybCgjZCkiPjxjaXJjbGUgY3g9Ijk2IiBjeT0iMTYwIiBmaWxsPSIjRjFGMUYxIiByPSIzNC41NSIvPjxjaXJjbGUgY3g9Ijk2IiBjeT0iMTYwIiBmaWxsPSIjNDI4NUY0IiByPSIyNy42NCIvPjwvZz48L2c%2BPHBhdGggY2xpcC1wYXRoPSJ1cmwoI2IpIiBkPSJNOCAyMGgxNzZ2NzZIOHoiIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8%2BPHBhdGggZD0iTTggOTVoMTc2djFIOHoiIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iLjAyIi8%2BPHBhdGggZD0iTTggOTZoMTc2djFIOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8%2BPHBhdGggZD0iTTExNiA1Mkg3NmMtNC4yNSAwLTcuNzItMy4zMi03Ljk3LTcuNS0uMDIuMTctLjAzLjMzLS4wMy41IDAgNC40MiAzLjU4IDggOCA4aDQwYzQuNDIgMCA4LTMuNTggOC04IDAtLjE3LS4wMS0uMzMtLjAzLS41LS4yNSA0LjE4LTMuNzIgNy41LTcuOTcgNy41ek04IDIwdjFoMTc2di0xSDh6IiBmaWxsPSIjMjEyMTIxIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjxwYXRoIGQ9Ik03NiAzNmg0MGM0LjI1IDAgNy43MiAzLjMyIDcuOTcgNy41LjAxLS4xNy4wMy0uMzMuMDMtLjUgMC00LjQyLTMuNTgtOC04LThINzZjLTQuNDIgMC04IDMuNTgtOCA4IDAgLjE3LjAxLjMzLjAzLjUuMjUtNC4xOCAzLjcyLTcuNSA3Ljk3LTcuNXptOTYgMTM1SDIwYy02LjYgMC0xMi01LjQtMTItMTJ2MWMwIDYuNiA1LjQgMTIgMTIgMTJoMTUyYzYuNiAwIDEyLTUuNCAxMi0xMnYtMWMwIDYuNi01LjQgMTItMTIgMTJ6IiBmaWxsPSIjMjMxRjIwIiBmaWxsLW9wYWNpdHk9Ii4xIi8%2BPHJhZGlhbEdyYWRpZW50IGN4PSI3LjUwMiIgY3k9IjE5LjM0NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJlIiByPSIyMjcuNTk2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ%2BPHBhdGggZD0iTTggMjB2MTQwYzAgNi42IDUuNCAxMiAxMiAxMmgxNTJjNi42IDAgMTItNS40IDEyLTEyVjIwSDh6bTEwOCAzMkg3NmMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOGg0MGM0LjQyIDAgOCAzLjU4IDggOHMtMy41OCA4LTggOHoiIGZpbGw9InVybCgjZSkiLz48L3N2Zz4%3D&label=size&labelColor=ffffff&color=ffdf00&link=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fchatgpt-utils%2Fjblbnhicpaildkkbfojidfckanofaaen%3Fauthuser%3D3%26hl%3Den)](https://chromewebstore.google.com/detail/jblbnhicpaildkkbfojidfckanofaaen?utm_source=item-share-cb)

> _Note: The version in the Chrome Web Store will take some time to update because it requires an approval review process before publishing, even though the initial update has been released on GitHub._

## Features

A personal learning project creating utilities to improve the ChatGPT experience.

🎫 **Token Counter**  

Quickly see how many tokens your selected text will consume. Perfect for both free and paid users who want to monitor usage efficiently.
- Powered by OpenAI-compatible tokenizers (`o200k` and `cl100k` support)

<details>
<summary>Click Here to Preview</summary>
   
  ![Token Counter](https://raw.githubusercontent.com/DaveUnknown/image-library/main/ChatGPT-Utils/token-counter.png)
</details>

---
🈸 **Word Counter** 

Instantly count the number of words in your selected text.
- Powered by **Alfaaz**, the fastest known word counter (credit to [@thecodrr](https://github.com/thecodrr/alfaaz)).

<details>
<summary>Click Here to Preview</summary>
   
  ![Word Counter](https://raw.githubusercontent.com/DaveUnknown/image-library/main/ChatGPT-Utils/word-counter.png)
</details>

---
📜 **Prompt Compressor**  

Instantly compresses your prompt to preserve tokens.
| Compression Method         | What It Does                                                                                  | Estimated Token Preservation                                                             | Best Use Case                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Whitespace Compression** | Removes unnecessary spacing to reduce token count without altering meaning.                   | ~15–40% fewer tokens (varies with formatting density).                                      | Ideal for long prompts where formatting isn't semantically important (e.g., notes, paragraphs, codes). |
| **Lexical Compression**    | Shortens text by replacing verbose phrases with concise equivalents while preserving meaning. | ~5–20% fewer tokens (highly dependent on prompt structure and verbosity).                 | Best for prompts containing repeated or verbose explanations (e.g., instructions, paragraphs, references). |

<details>
<summary>Click Here to Preview</summary>
   
  ![Prompt Compressor](https://raw.githubusercontent.com/DaveUnknown/image-library/main/ChatGPT-Utils/prompt-compressor.png)
</details>

---
## Installation
Here are a few improved versions of your installation guide, focusing on clarity, conciseness, and user-friendliness.

### From the Chrome Web Store

1.  Head over to the **[ChatGPT Utils page](https://chromewebstore.google.com/detail/jblbnhicpaildkkbfojidfckanofaaen?utm_source=item-share-cb)** on the Chrome Web Store.
2.  Click **"Install"**. You're all set! The extension will automatically update in the future.

### Manual Installation

1.  **Get the code:**
    * **Clone** the repository, or
    * **Download** the `.zip` file and extract it to a new folder.
2.  **Open Extensions:** Type `chrome://extensions/` (for Chrome) or `opera://extensions/` (for Opera/Opera GX) into your browser's address bar and hit Enter.
3.  **Enable Developer Mode:** Find and toggle on **"Developer mode"** (usually in the top-right corner).
4.  **Load Extension:** Click **"Load unpacked"** and select the folder you extracted in step 1.

**Note:** _This extension does not support Firefox or Safari._

## 🔄 Planned Updates

The current version only includes the **Token Counter**, but more utilities and functions are coming soon:

- [x] **Automatic Update System** - The `update_url` key has been restricted in many browsers, making this feature only available via the Chrome Web Store.
- [x] **Token Counter**
- [x] **Word Counter**
- [x] **Multi Tokenizers**
- [x] **Utility Selection UI**
- [x] **Prompt Compressor**
- [ ] **Token Tracker**
- [ ] **Analytics Dashboard**
- [ ] **Chat Exporter**
- [ ] **~Chat Organizer~ (deprecated)**
- [ ] **Theme Customizer**
- [ ] **AI Hub**
**and many more...**

Stay tuned for regular feature drops and UI improvements!

## 🤝 Contributing

Suggestions, feature requests, or bug reports are welcome.  
Create an issue or open a pull request on the repository.

## License 

```
PolyForm Noncommercial License 1.0.0

Copyright (c) 2025 Zed Unknown

Licensed under the PolyForm Noncommercial License 1.0.0
See https://polyformproject.org/licenses/noncommercial/1.0.0/
```
