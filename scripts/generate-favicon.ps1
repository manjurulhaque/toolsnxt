Add-Type -AssemblyName System.Drawing

function Render-FaviconBitmap {
    param([int]$size)

    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $bgColor = [System.Drawing.Color]::FromArgb(255, 33, 37, 41)
    $accentColor = [System.Drawing.Color]::FromArgb(255, 184, 93, 56)
    $creamColor = [System.Drawing.Color]::FromArgb(255, 245, 239, 230)

    # Rounded background
    $corner = [float]($size * 0.22)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, $corner * 2, $corner * 2, 180, 90)
    $path.AddArc($size - $corner * 2, 0, $corner * 2, $corner * 2, 270, 90)
    $path.AddArc($size - $corner * 2, $size - $corner * 2, $corner * 2, $corner * 2, 0, 90)
    $path.AddArc(0, $size - $corner * 2, $corner * 2, $corner * 2, 90, 90)
    $path.CloseFigure()

    $bgBrush = New-Object System.Drawing.SolidBrush($bgColor)
    $g.FillPath($bgBrush, $path)
    $bgBrush.Dispose()

    # Center disk
    $diskRadius = [float]($size * 0.28)
    $diskBrush = New-Object System.Drawing.SolidBrush($accentColor)
    $g.FillEllipse($diskBrush, [float]($size * 0.5 - $diskRadius), [float]($size * 0.5 - $diskRadius), $diskRadius * 2, $diskRadius * 2)
    $diskBrush.Dispose()

    # Stylized M mark
    $penWidth = [float]($size * 0.08)
    if ($penWidth -lt 1.5) { $penWidth = 1.5 }
    $pen = New-Object System.Drawing.Pen($creamColor, $penWidth)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    $topY = [float]($size * 0.38)
    $midY = [float]($size * 0.52)
    $botY = [float]($size * 0.65)
    $leftX = [float]($size * 0.36)
    $midX = [float]($size * 0.50)
    $rightX = [float]($size * 0.64)

    $points = @(
        (New-Object System.Drawing.PointF($leftX, $botY)),
        (New-Object System.Drawing.PointF($leftX, $topY)),
        (New-Object System.Drawing.PointF($midX, $midY)),
        (New-Object System.Drawing.PointF($rightX, $topY)),
        (New-Object System.Drawing.PointF($rightX, $botY))
    )
    $g.DrawLines($pen, $points)
    $pen.Dispose()
    $path.Dispose()
    $g.Dispose()

    return $bitmap
}

function Create-IcoFile {
    param(
        [int[]]$sizes,
        [string]$outputPath
    )

    $pngList = @()
    foreach ($s in $sizes) {
        $bmp = Render-FaviconBitmap -size $s
        $ms = New-Object System.IO.MemoryStream
        $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        $pngList += @{
            Width = $s
            Height = $s
            Data = $ms.ToArray()
        }
        $ms.Dispose()
    }

    $fs = [System.IO.File]::Create($outputPath)
    $bw = New-Object System.IO.BinaryWriter($fs)

    # ICONDIR
    $bw.Write([uint16]0) # Reserved
    $bw.Write([uint16]1) # Type: 1 = ICO
    $bw.Write([uint16]$pngList.Count) # Count

    $offset = 6 + ($pngList.Count * 16)

    # ICONDIRENTRY list
    foreach ($img in $pngList) {
        $w = if ($img.Width -ge 256) { 0 } else { [byte]$img.Width }
        $h = if ($img.Height -ge 256) { 0 } else { [byte]$img.Height }
        $bw.Write([byte]$w)
        $bw.Write([byte]$h)
        $bw.Write([byte]0) # Colors
        $bw.Write([byte]0) # Reserved
        $bw.Write([uint16]1) # Planes
        $bw.Write([uint16]32) # Bpp
        $bw.Write([uint32]$img.Data.Length) # BytesInRes
        $bw.Write([uint32]$offset) # ImageOffset
        $offset += $img.Data.Length
    }

    # Image Data payloads
    foreach ($img in $pngList) {
        $bw.Write($img.Data)
    }

    $bw.Flush()
    $bw.Close()
    $fs.Close()

    Write-Output "Successfully generated: $outputPath with $($pngList.Count) sizes ($($sizes -join ', '))"
}

Create-IcoFile -sizes @(16, 32, 48) -outputPath "src/app/favicon.ico"
Create-IcoFile -sizes @(16, 32, 48) -outputPath "public/favicon.ico"
