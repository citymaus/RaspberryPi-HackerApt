**HackerApt** is an Apache website designed to display on a RaspberryPi3-cobbled hardware setup.
 
HackerApt contains two projects.

### /html
#### A client-side web application (html, css, js)
- **HackerApt** displays (best with Raspbian Chromium) current weather and WMATA train/bus info. 
- Future updates might include news.

### /src
#### A Visual Studio 2017 C# console project to generate static data
- Run Program.cs to create local JSON data of less-changing objects, such as WMATA station and bus-stop info, to reduce daily API calls.
Output files generated: /html/api/wmata
```
- static_stationinfo.json
- static_busstopinfo.json
- static_busrouteinfo.json
```
TODO: set up a cron job to auto-run every month or so.

This website uses several third-party APIs (personal key required) for current data:

## API Keys Required:
### WMATA
* https://developer.wmata.com/
- Default Tier request rate limited to 10 calls/second and 50,000 calls per day.
*Provides:*
- Bus Route and Stop Methods
- Incidents
- Misc Methods
- Rail Station Information
- Real-Time Bus Predictions
- Real-Time Rail Predictions
- Train Positions

### DARKSKY
* https://darksky.net/dev/docs
- First 1000 requests/day are free
- Every API request beyond that costs $0.0001
Provides:
- Current weather conditions
- Minute-by-minute forecasts out to one hour
- Hour-by-hour and day-by-day forecasts out to seven days
- Hour-by-hour and day-by-day observations going back decades

## Media Credits: 
### DRIPICONS-WEATHER
* http://demo.amitjakhu.com/dripicons-weather/
(Included in /html/svg)

### FONTAWESOME
* https://fontawesome.com/
(Included in /html/webfonts)

## Raspbian packages to install:
### Chromium browser:
`rpi-chromium-mods`
### Apache web server:
`apache2`
### NodeJS:
`nodejs`
### Node Version Manager (NPM):
`npm`

## CORS-ANYWHERE NodeJS Proxy
* https://github.com/Rob--W/cors-anywhere
HackerApt also uses the CORS-ANYWHERE NodeJS proxy server to allow cross-origin API requests on Raspbian Chromium.
Install NodeJS package, then clone the CORS-ANYWHERE project

Create an "api_keys.txt" file in /html/settings
Sample key file:
WMATA KEY: {your WMATA developer key}
DARKSKY KEY: {your DARKSKY developer key}
USEPROXY: yes
(Set USEPROXY to yes if you see "Access-Control-Allow-Origin" errors. This will enable CORS-ANYWHERE, which needs to run at startup).

sudo nano /boot/config.txt
--------------------------
```
# Display orientation. Landscape = 0, Portrait = 1
display_rotate=1

# Use 24 bit colors
framebuffer_depth=24

# You'll want to check and make sure that disable_overscan=1 is commented out.
# If black pixels border your desktop image, modify these values until the picture fits your monitor perfectly.
overscan_left=-32
overscan_right=-32
overscan_top=-32
overscan_bottom=-32
```

## Desktop Shortcuts
### Fullscreen Webpage
*(/home/pi/Desktop/hackerapt_fullscreen.desktop)*
```
[Desktop Entry]
Type=Application
Name=HackerApt (Fullscreen)
Comment=Weather, trains, buses, and news
Icon=/home/pi/Pictures/[some picture].png
Exec=chromium-browser --noerrdialogs --disable-session-crashed-bubble --user-data-dir --kiosk --start-maximized http://hackerapt.com/index.html
```

### Maximized, but not Fullscreen Webpage
*(/home/pi/Desktop/hackerapt.desktop)*:
```
[Desktop Entry]
Type=Application
Name=HackerApt
Comment=Weather, trains, buses, and news
Icon=/home/pi/Pictures/[some picture].png
Exec=chromium-browser --noerrdialogs --disable-session-crashed-bubble --user-data-dir http://hackerapt.com/index.html
```

## Raspbian System Startup
TODO: Add bash script to auto-start CORS-ANYWHERE server on boot (server.js).
TODO: Add bash script that boots fullscreen or maximized HackerApt.

Turn HDMI on/off during unused hours to save power.
### /home/pi/rpi-hdmi.sh
Credit: https://gist.github.com/AGWA/9874925
```
#!/bin/sh

# Enable and disable HDMI output on the Raspberry Pi
# Goes in /home/pi/rpi-hdmi.sh

is_off ()
{
	tvservice -s | grep "TV is off" >/dev/null
}

case $1 in
	off)
		tvservice -o
	;;
	on)
		if is_off
		then
			tvservice -p
			curr_vt=`fgconsole`
			if [ "$curr_vt" = "1" ]
			then
				chvt 2
				chvt 1
			else
				chvt 1
				chvt "$curr_vt"
			fi
		fi
	;;
	status)
		if is_off
		then
			echo off
		else
			echo on
		fi
	;;
	*)
		echo "Usage: $0 on|off|status" >&2
		exit 2
	;;
esac

exit 0
```

### CRON tab Editor
```
# RULES:
# Turn HDMI On (6:00am) M-F
0 6 * * 1-5 /home/pi/rpi-hdmi.sh on 
# Turn HDMI Off (9:00am) M-F
0 22 * * 1-5 /home/pi/rpi-hdmi.sh off
# Turn HDMI On (5:45pm) M-F
45 17 * * 1-5 /home/pi/rpi-hdmi.sh on 
# Turn HDMI On (8:00am) SS
0 8 * * 6-7 /home/pi/rpi-hdmi.sh on
# Turn HDMI Off (11:59pm) EVERY DAY
59 23 * * * /home/pi/rpi-hdmi.sh off 
```

## License

Copyright (C) 2018 Steph Stubler <https://www.linkedin.com/in/stephstubler/>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.