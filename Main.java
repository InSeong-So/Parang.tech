package main;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Optional;

public class Main
{
    public static void main(String[] args) throws UnsupportedEncodingException
    {
        File input = new File("D:/sicument/TestWorkspace/Export-5ec30bba-214c-463e-b986-aa805233cbf7");
        File output = new File("D:/sicument/TestWorkspace/Export");
        copy(input, output);
        System.out.println("완료");
        //        System.out.println(URLDecoder.decode("%E1%84%90%E1%85%B3%E1%84%85%E1%85%B5(Tree)%20b739c692fc294388bf6f2b006612e073/Untitled%20Database%2081889964e881434f81bf03483eca1209.csv", "UTF-8"));
    }
    
    public static void copy(File sourceF, File targetF)
    {
        // 타겟폴더가 존재하지 않으면 생성
        if (!targetF.exists())
        {
            targetF.mkdir();
        }
        
        File[] ff = sourceF.listFiles();
        for (File file : ff)
        {
            String path = "";
            String tempFileStr = file.getName();
            
            Optional<String> ext = getExtensionByStringHandling(tempFileStr);
            if (ext.isPresent())
            {
                if ("md".equals(ext.get()))
                {
                    path = targetF.getAbsolutePath() + File.separator + tempFileStr.substring(0, tempFileStr.length() - 35).trim() + ".md";
                }
                else
                {
                    path = targetF.getAbsolutePath() + File.separator + tempFileStr;
                }
            }
            else
            {
                path = targetF.getAbsolutePath() + File.separator + tempFileStr.substring(0, tempFileStr.length() - 32).trim();
            }
            
            File temp = new File(path);
            if (file.isDirectory())
            {
                temp.mkdir();
                copy(file, temp);
            }
            //            else
            //            {
            //                FileInputStream fis = null;
            //                FileOutputStream fos = null;
            //                try
            //                {
            //                    fis = new FileInputStream(file);
            //                    fos = new FileOutputStream(temp);
            //                    byte[] b = new byte[4096];
            //                    int cnt = 0;
            //                    while ((cnt = fis.read(b)) != -1)
            //                    {
            //                        fos.write(b, 0, cnt);
            //                    }
            //                }
            //                catch (Exception e)
            //                {
            //                    e.printStackTrace();
            //                }
            //                finally
            //                {
            //                    try
            //                    {
            //                        fis.close();
            //                        fos.close();
            //                    }
            //                    catch (IOException e)
            //                    {
            //                        e.printStackTrace();
            //                    }
            //                }
            //            }
        }
    }
    
    private static Optional<String> getExtensionByStringHandling(String filename)
    {
        return Optional.ofNullable(filename).filter(f -> f.contains(".")).map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }
}